'use strict';
const request = require('request-promise');
var Location = require('./location');
const apiKey =
  'pk.eyJ1IjoiZGFzaGluIiwiYSI6ImNrcDhjMDNhZDA4bmMydnA3MmxoaHF3NmwifQ.YNRGn0LrTFePlsA-y50qng';
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
      Activity.remoteMethod('reverse', {
        accepts: [
          { arg: 'req', type: 'object', http: { source: 'req' } },
          { arg: 'lon', type: 'number', required: true },
          { arg: 'lat', type: 'number', required: true },
          
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
