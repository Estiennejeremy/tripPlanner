import config from '../../config.json';

export async function getLocationsActivities(data) {
  try {
    const query = {
      coord: `${data.lon},${data.lat},${data.range}`,
      start: data.start,
      stop: data.stop,
      type: 'culture',
    };
    const res = await fetch(
      `${config.api_url}/activities/getAllActivity?${new URLSearchParams(
        query,
      )}`,
    );
    return await res.json();
  } catch (e) {
    return { error: e };
  }
}
