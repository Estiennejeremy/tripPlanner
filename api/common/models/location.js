'use strict';
const request = require('request-promise');
var Activity = require('./activity');
const apiKey =
  'pk.eyJ1IjoiZGFzaGluIiwiYSI6ImNrcDhjMDNhZDA4bmMydnA3MmxoaHF3NmwifQ.YNRGn0LrTFePlsA-y50qng';

module.exports = function(Location) {
    (Location.SearchPosition = async function (req, query) {
        try {
          let allLoca = [];
          var app = Location.app;
          const res = await request({
            method: 'GET',
            uri: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + query + '.json' ,
            qs: {
              access_token: apiKey
            },
            json: true,
          });

          for(var raw of res.features) {
            let location = await Location.findOrCreate({
                
                where: { lon: raw.geometry.coordinates[0], lat: raw.geometry.coordinates[1] },
              },
            {
              lon: raw.geometry.coordinates[0], 
              lat: raw.geometry.coordinates[1],
              name: raw.place_name


            });
            if(location != null && raw.place_type == "poi") {
              let activity = await app.models.Activity.findOrCreate({
                where: {name: raw.place_name}
            },
            {
              name: raw.place_name,
              type: raw.properties.category,
              address: raw.properties.address,
              locationId: location[0].id,
              price: 0
            })

            location[0].activity = activity[0];
          }
          
            allLoca.push(location[0])

          }
         
          return allLoca;

        } catch (err) {
          console.error(err);
        }
      }),

      (Location.reverse = async function (req, lon, lat) {
        try {
         let allLoca = [];
          var app = Location.app;
          const res = await request({
            method: 'GET',
            uri: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + lon +','+ lat +'.json' ,
            qs: {
              access_token: apiKey
            },
            json: true,
          });
          

          for(var raw of res.features) {
            let location = await Location.findOrCreate({
                
                where: { lon: raw.geometry.coordinates[0], lat: raw.geometry.coordinates[1] },
              },
            {
              lon: raw.geometry.coordinates[0], 
              lat: raw.geometry.coordinates[1],
              name: raw.place_name


            });

              allLoca.push(location[0])

          }
         
          return allLoca;

        } catch (err) {
          console.error(err);
        }
      }),

    Location.remoteMethod('reverse', {
      accepts: [
        { arg: 'req', type: 'object', http: { source: 'req' } },
        { arg: 'lon', type: 'number', required: true },
        { arg: 'lat', type: 'number', required: true },
        
      ],
      http: { verb: 'GET' },
      returns: { type: 'object', root: true },
    })
    Location.remoteMethod('SearchPosition', {
        accepts: [
          { arg: 'req', type: 'object', http: { source: 'req' } },
          { arg: 'query', type: 'string', required: true },
          
        ],
        http: { verb: 'GET' },
        returns: { type: 'object', root: true },
      });
};
