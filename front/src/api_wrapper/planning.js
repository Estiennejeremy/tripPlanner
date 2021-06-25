import config from '../../config.json';

export async function addActivityToTrip(data) {
  try {
    const res = await fetch(`${config.api_url}/plannings/addActivityToTravel`, {
      method: 'POST',
      body: JSON.stringify({
        travelId: data.travelId,
        date: data.date,
        activityId: data.activityId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return await res.json();
  } catch (e) {
    return { error: e };
  }
}

export async function addTransportToTrip(data) {
  try {
    const res = await fetch(`${config.api_url}/plannings/addActivityToTravel`, {
      method: 'POST',
      body: JSON.stringify({
        travelId: data.travelId,
        date: data.date,
        transportId: data.transportId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return await res.json();
  } catch (e) {
    return { error: e };
  }
}
