import config from '../../config.json';

export async function createUser(userData) {
  try {
    const res = await fetch(`${config.api_url}/users/register`, {
      method: 'POST',
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password,
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

export async function loginUser(userData) {
  try {
    const res = await fetch(`${config.api_url}/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
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

export async function getUserByToken(userToken) {
  try {
    const query = JSON.stringify({ where: { token: userToken } });
    const res = await fetch(`${config.api_url}/tokens?filter=${query}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const userId = (await res.json())[0].userId;
    const userRes = await fetch(`${config.api_url}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return await userRes.json();
  } catch (e) {
    return { error: e };
  }
}

export async function updateUser(userData) {
  try {
    const res = await fetch(`${config.api_url}/users/updateUser`, {
      method: 'PUT',
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
        email: userData.email,
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
