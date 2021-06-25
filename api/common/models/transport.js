'use strict';
const request = require('request-promise');
var Activity = require('./activity');
const apiKey =
  'pk.eyJ1IjoiZGFzaGluIiwiYSI6ImNrcDhjMDNhZDA4bmMydnA3MmxoaHF3NmwifQ.YNRGn0LrTFePlsA-y50qng';

module.exports = function (Transport) {
  (Transport.getDirections = async function (req, waypoints, type) {
    try {
      let allLoca = [];
      var app = Transport.app;
      const res = await request({
        method: 'GET',
        uri:
          'https://api.mapbox.com/directions/v5/mapbox/' +
          type +
          '/' +
          waypoints,
        qs: {
          access_token: apiKey,
        },
        json: true,
      });

      return res;
    } catch (err) {
      console.error(err);
    }
  }),
    (Transport.getOrCreate = async function (fromId, toId, duration, distance) {
      try {
        const transport = await Transport.findOrCreate(
          { where: { fromId: fromId, toId: toId, duration: duration } },
          {
            fromId: fromId,
            toId: toId,
            duration: duration,
            distance: distance,
          },
        );
        return transport[0];
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
  Transport.remoteMethod('getOrCreate', {
    accepts: [
      { arg: 'fromId', type: 'number', required: true },
      { arg: 'toId', type: 'number', required: true },
      { arg: 'duration', type: 'string', required: true },
      { arg: 'distance', type: 'string', required: true },
    ],
    http: { verb: 'GET' },
    returns: { type: 'object', root: true },
  });
};
