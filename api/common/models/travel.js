'use strict';

module.exports = function (Travel) {
  Travel.createTravel = async function (data) {
    var app = Travel.app;
    try {
      if (!data.name || !data.from || !data.to || !data.dates || !data.userId) {
        return { error: 'Missing credentials' };
      }

      const existingTravel = await Travel.findOne({
        where: { name: data.name, userId: data.userId },
      });

      if (existingTravel)
        return { error: "Can't create a trip with an existing name" };

      const fromLocation = await app.models.Location.findOrCreate(
        { where: { name: data.from.name } },
        {
          name: data.from.name,
          lon: data.from.lon,
          lat: data.from.lat,
        },
      );
      const toLocation = await app.models.Location.findOrCreate(
        { where: { name: data.to.name } },
        {
          name: data.to.name,
          lon: data.to.lon,
          lat: data.to.lat,
        },
      );

      const travel = await Travel.create({
        name: data.name,
        departDate: data.dates.end,
        arrivalDate: data.dates.start,
        userId: data.userId,
        fromId: fromLocation[0].id,
        toId: toLocation[0].id,
      });

      return { success: 'Successfuly updated', travel: travel };

    } catch (e) {
      return { error: 'An error occured' };
    }
  };

  Travel.remoteMethod('createTravel', {
    accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
    returns: { type: 'object', root: true },
    http: { verb: 'POST' },
  });
};
