'use strict';
const request = require('request-promise');
var Activity = require('./activity');
const apiKey =
  'pk.eyJ1IjoiZGFzaGluIiwiYSI6ImNrcDhjMDNhZDA4bmMydnA3MmxoaHF3NmwifQ.YNRGn0LrTFePlsA-y50qng';


module.exports = function(Transport) {

    (Transport.getDirections = async function (req, waypoints, type) {
        try {
         let allLoca = [];
          var app = Location.app;
          const res = await request({
            method: 'GET',
            uri: 'https://api.mapbox.com/directions/v5/mapbox/' + type +'/'+ waypoints +'.json' ,
            qs: {
              access_token: apiKey
            },
            json: true,
          });
        
          return res;

        } catch (err) {
          console.error(err);
        }
      }),

      Transport.remoteMethod('getDirections', {
        accepts: [
          { arg: 'req', type: 'object', http: { source: 'req' } },
          { arg: 'waypoints', type: 'string', required: true },
          { arg: 'type', type: 'string', required: true },
          
        ],
        http: { verb: 'GET' },
        returns: { type: 'object', root: true },
      });

};
