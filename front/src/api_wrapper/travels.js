import config from '../../config.json';

export async function createTrip(tripData) {
  try {
    const res = await fetch(`${config.api_url}/travels/createTravel`, {
      method: 'POST',
      body: JSON.stringify({
        name: tripData.name,
        from: tripData.from,
        to: tripData.to,
        dates: tripData.dates,
        userId: tripData.userId,
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

export async function getUserTripsByUserId(userId) {
  try {
    const query = JSON.stringify({ where: { userId: userId } });
    const res = await fetch(`${config.api_url}/travels?filter=${query}`, {
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

export async function deleteTripById(tripId) {
  try {
    const res = await fetch(`${config.api_url}/travels/${tripId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return await res.json();
  } catch (e) {
    return { error: e };
  }
}
