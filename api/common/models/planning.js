'use strict';

module.exports = function (Planning) {
  Planning.addActivityToTravel = async function (data) {
    var app = Planning.app;
    try {
      if (
        !data.travelId ||
        !data.date ||
        (!data.transportId && !data.activityId)
      ) {
        console.log('ici');
        return { error: 'Missing data' };
      }

      const existingTravel = await app.models.Travel.findOne({
        where: { id: data.travelId },
      });

      if (!existingTravel) return { error: "Trip doesn't exist" };

      let planning = {};

      if (data.activityId) {
        const existingActivity = await app.models.Activity.findOne({
          where: { id: data.activityId },
        });
        if (!existingActivity) return { error: "Activity doesn't exist" };
        planning = await Planning.create({
          travelId: data.travelId,
          activityId: data.activityId,
          date: data.date,
        });
      }

      if (data.transportId) {
        const existingTransport = await app.models.Transport.findOne({
          where: { id: data.transportId },
        });
        if (!existingTransport || existingTransport == null) {
          return { error: "Transport doesn't exist" };
        }

        planning = await Planning.create({
          travelId: data.travelId,
          transportId: data.transportId,
          date: data.date,
        });
      }

      return { success: 'Successfuly updated', planning: planning };
    } catch (e) {
      return { error: 'An error occured' };
    }
  };

  Planning.deleteActivityFromTravel = async function (data) {
    var app = Planning.app;
    try {
      if (!data.activityId || !data.travelId) {
        return { error: 'Missing data' };
      }

      const existingTravel = await app.models.Travel.findOne({
        where: { id: data.travelId },
      });

      if (!existingTravel) return { error: "Trip doesn't exist" };

      const existingActivity = await app.models.Activity.findOne({
        where: { id: data.activityId },
      });

      if (!existingActivity) return { error: "Activity doesn't exist" };

      const planning = await Planning.findOne({
        travelId: data.travelId,
        activityId: data.activityId,
      });

      if (!planning) return { error: 'Planning doesnt exist' };

      var res = await Planning.destroyById(planning.id);

      return { success: 'Successfuly updated', res: res };
    } catch (e) {
      return { error: 'An error occured' };
    }
  };

  Planning.remoteMethod('addActivityToTravel', {
    accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
    returns: { type: 'object', root: true },
    http: { verb: 'POST' },
  });
};
