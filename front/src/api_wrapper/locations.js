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

export async function getOrCreate(data) {
  try {
    const query = {
      lon: data.lon,
      lat: data.lat,
      name: data.name,
    };
    const res = await fetch(
      `${config.api_url}/locations/getOrCreate?${new URLSearchParams(query)}`,
    );
    return await res.json();
  } catch (e) {
    return { error: e };
  }
}
// export async function getLocationsActivities() {
//   try {
//     const res = await fetch(`${config.api_url}/locations/SearchPosition`)
//   } catch (e) {
//     return { error: e };
//   }
// }
