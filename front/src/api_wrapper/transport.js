import config from '../../config.json';

export async function getTransports(data) {
  try {
    const types = ['walking', 'driving', 'cycling'];
    let finalRes = [];
    for (let i = 0; i < types.length; i += 1) {
      let query = {
        waypoints: `${data.from.lon},${data.from.lat};${data.to.lon},${data.to.lat}`,
        type: types[i],
      };
      let res = await fetch(
        `${config.api_url}/transports/getDirections?${new URLSearchParams(
          query,
        )}`,
      );
      let toConcat = (await res.json()).routes;
      finalRes = finalRes.concat(toConcat);
    }
    return finalRes;
  } catch (e) {
    return { error: e };
  }
}

export async function getOrCreateTransport(data) {
  try {
    const query = {
      fromId: data.fromId,
      toId: data.toId,
      duration: data.duration,
      distance: data.distance,
    };
    const res = await fetch(
      `${config.api_url}/transports/getOrCreate?${new URLSearchParams(query)}`,
    );
    return await res.json();
  } catch (e) {
    return { error: e };
  }
}

export async function getTransportById(transportId) {
  try {
    const res = await fetch(`${config.api_url}/transports/${transportId}`, {
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
