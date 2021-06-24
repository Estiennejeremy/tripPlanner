'use strict';
const request = require('request-promise');
var Location = require('./location');
const apiKey =
  'pk.eyJ1IjoiZGFzaGluIiwiYSI6ImNrcDhjMDNhZDA4bmMydnA3MmxoaHF3NmwifQ.YNRGn0LrTFePlsA-y50qng';
const gmapKey = 'AIzaSyAGEZDUwarbOTnRm5uy9T4DaDvRdcgOQpQ';
module.exports = function(Activity) {

    (Activity.getByIdLocation = async function (req, id) {
        try {
         let allLoca = [];
          var app = Activity.app;
        
          let activity = await Activity.findOne({
                where: { locationId: id },
              });
        
          return activity;

        } catch (err) {
          console.error(err);
        }
      }),
      (Activity.reverse = async function (req, lon, lat) {
        try {
         let allActi = [];
          var app = Activity.app;
          const res = await request({
            method: 'GET',
            uri: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + lon +','+ lat +'.json' ,
            qs: {
              access_token: apiKey
            },
            json: true,
          });
          

          for(var raw of res.features) {
            let location = await app.models.Location.findOrCreate({
                
                where: { lon: raw.geometry.coordinates[0], lat: raw.geometry.coordinates[1] },
              },
            {
              lon: raw.geometry.coordinates[0], 
              lat: raw.geometry.coordinates[1],
              name: raw.place_name


            });

              if(location != null && raw.place_type == "poi") {
                let activity = await Activity.findOrCreate({
                  where: {name: raw.place_name}
              },
              {
                name: raw.place_name,
                type: raw.properties.category,
                address: raw.properties.address,
                locationId: location[0].id,
                price: 0
              })

            

              allActi.push(activity[0])
            }

          }
         
          return allActi;

        } catch (err) {
          console.error(err);
        }
      }),
      (Activity.getActivitesByCity = async function (req, coord, radius, type) {
        try {

         let allActi = [];
          var app = Activity.app;
          const res = await request({
            method: 'GET',
            uri: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json' ,
            qs: {
              key: gmapKey,
              location: coord,
              radius: radius,
              type: type
            },
            json: true,
          });

          for(var raw of res.results) {

            let location = await app.models.Location.findOrCreate({
                
              where: { lon: raw.geometry.location.lng, lat: raw.geometry.location.lat },
            },
          {
            lon:   raw.geometry.location.lng, 
            lat: raw.geometry.location.lat,
            name: raw.name


          });
            if(location != null) {
              let activity = await Activity.findOrCreate({
                where: {name: raw.name, address:raw.vicinity}
            },
            {
              name: raw.name,
              type: raw.types,
              address: raw.vicinity,
              locationId: location[0].id,
              location: location[0],
              price:  Math.floor(Math.random() * 20)
            })
            activity[0].lon = raw.geometry.location.lng, 
            activity[0].lat = raw.geometry.location.lat
            allActi.push(activity[0])
           }
          }
         
          return allActi;

        } catch (err) {
          console.error(err);
        }
      }),
      (Activity.getAllActivity = async function (req, coord, start, stop, type ) {
        try {
         let allActi = [];
          var app = Activity.app;
          const res = await request({
            method: 'GET',
            uri: 'http://api.openeventdatabase.org/event' ,
            qs: {
              what: type,
              near: coord,
              start: start,
              stop: stop
            },
            json: true,
          });

         
          for(var raw of res.features) {
            let location = await app.models.Location.findOrCreate({
                
              where: { lon: raw.geometry.coordinates[0], lat: raw.geometry.coordinates[1] },
            },
          {
            lon:  raw.geometry.coordinates[0], 
            lat: raw.geometry.coordinates[1],
            name: raw.properties.location_name ? raw.properties.location_name : raw.properties.source


          });

            if(location != null) {
              const name = raw.properties.label ?  raw.properties.label :  raw.properties.name ;
              const  caddr = raw.properties.location_address ? raw.properties.location_address + " " + raw.properties.location_city : raw.properties.source;
              let activity = await Activity.findOrCreate({
                where: {name: name}
            },
            {
              name: name,
              type: type,
              address: caddr,
              locationId: location[0].id,
              price:  Math.floor(Math.random() * 20)
            })

            allActi.push(activity[0])
          }
          }

          return allActi;

        } catch (err) {
          console.error(err);
        }
      }),
      Activity.remoteMethod('reverse', {
        accepts: [
          { arg: 'req', type: 'object', http: { source: 'req' } },
          { arg: 'lon', type: 'number', required: true },
          { arg: 'lat', type: 'number', required: true },
          
        ],
        http: { verb: 'GET' },
        returns: { type: 'object', root: true },
      }),
      Activity.remoteMethod('getAllActivity', {
        accepts: [
          { arg: 'req', type: 'object', http: { source: 'req' } },
          { arg: 'coord', type: 'array', required: true }, 
          { arg: 'start', type: 'string', required: true },
          { arg: 'stop', type: 'string', required: true },
          { arg: 'type', type: 'string', required: false },
          
        ],
        http: { verb: 'GET' },
        returns: { type: 'object', root: true },
      }),
      Activity.remoteMethod('getActivitesByCity', {
        accepts: [
          { arg: 'req', type: 'object', http: { source: 'req' } },
          { arg: 'coord', type: 'string', required: true }, 
          { arg: 'radius', type: 'number', required: true },
          { arg: 'type', type: 'array', required: false },
          
        ],
        http: { verb: 'GET' },
        returns: { type: 'object', root: true },
      }),
      Activity.remoteMethod('getByIdLocation', {
        accepts: [
          { arg: 'req', type: 'object', http: { source: 'req' } },
          { arg: 'id', type: 'number', required: true }
        ],
        http: { verb: 'GET' },
        returns: { type: 'object', root: true },
      });
};
