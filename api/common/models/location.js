'use strict';
const request = require('request-promise');
var Activity = require('./activity');
const apiKey =
  'pk.eyJ1IjoiZGFzaGluIiwiYSI6ImNrcDhjMDNhZDA4bmMydnA3MmxoaHF3NmwifQ.YNRGn0LrTFePlsA-y50qng';
const gmapKey = 'AIzaSyAGEZDUwarbOTnRm5uy9T4DaDvRdcgOQpQ';

module.exports = function (Location) {
  (Location.SearchCity = async function (req, query) {
    try {
      let allLoca = [];
      var app = Location.app;
      const res = await request({
        method: 'GET',
        uri: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
        qs: {
          key: gmapKey,
          input: query,
          fields: 'formatted_address,name,geometry',
          inputtype: 'textquery',
        },
        json: true,
      });

      console.log(res.candidates[0]);
      if(!res.candidates[0]) {
        {
          return { error: 'Missing data' };
        }
      }
      let location = await Location.findOrCreate(
        {
          where: {
            lon: res.candidates[0].geometry.location.lng,
            lat: res.candidates[0].geometry.location.lat,
          },
        },
        {
          lon: res.candidates[0].geometry.location.lng,
          lat: res.candidates[0].geometry.location.lat,
          name: res.candidates[0].formatted_address,
        },
      );

      return location[0];
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
          uri:
            'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
            lon +
            ',' +
            lat +
            '.json',
          qs: {
            access_token: apiKey,
          },
          json: true,
        });

        for (var raw of res.features) {
          let location = await Location.findOrCreate(
            {
              where: {
                lon: raw.geometry.coordinates[0],
                lat: raw.geometry.coordinates[1],
              },
            },
            {
              lon: raw.geometry.coordinates[0],
              lat: raw.geometry.coordinates[1],
              name: raw.place_name,
            },
          );

          allLoca.push(location[0]);
        }

        return allLoca;
      } catch (err) {
        console.error(err);
      }
    }),
    (Location.getOrCreate = async function (lon, lat, name) {
      try {
        const location = await Location.findOrCreate(
          { where: { name: name } },
          {
            name: name,
            lon: lon,
            lat: lat,
          },
        );
        return location[0];
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
    });
  Location.remoteMethod('SearchCity', {
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } },
      { arg: 'query', type: 'string', required: true },
    ],
    http: { verb: 'GET' },
    returns: { type: 'object', root: true },
  });
  Location.remoteMethod('getOrCreate', {
    accepts: [
      { arg: 'lon', type: 'string', required: true },
      { arg: 'lat', type: 'string', required: true },
      { arg: 'name', type: 'string', required: true },
    ],
    http: { verb: 'GET' },
    returns: { type: 'object', root: true },
  });
};
