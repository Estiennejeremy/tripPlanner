import config from '../../config.json';

export async function getLocationById(locationId) {
  try {
    const res = await fetch(`${config.api_url}/locations/${locationId}`, {
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
