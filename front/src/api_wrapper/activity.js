import config from '../../config.json';

export async function getLocationsActivities(data) {
  try {
    let finalRes = [];
    for await (const type of data.types) {
      let query = {
        coord: `${data.lat},${data.lon}`,
        radius: data.range * 1000,
        type: type,
      };
      let res = await fetch(
        `${config.api_url}/activities/getActivitesByCity?${new URLSearchParams(
          query,
        )}`,
      );
      let toConcat = await res.json();
      finalRes = finalRes.concat(toConcat);
    }
    return finalRes;
  } catch (e) {
    return { error: e };
  }
}

export async function getActivityById(activityId) {
  try {
    const res = await fetch(`${config.api_url}/activities/${activityId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return await res.json();
  } catch (e) {
    return { error: e };
  }
}

// library auqarium bar museum cafe campground park church mosque restaurant stadium synagogue tourist_attraction zoo
