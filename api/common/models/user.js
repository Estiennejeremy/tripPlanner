'use strict';
var sha1 = require('sha1');
const request = require('request-promise-native');
const { v1: uuidv1 } = require('uuid');

module.exports = function (User) {
  User.register = async function (data) {
    try {
      if (!data.username || !data.password || !data.email)
        return { error: 'Missing credentials' };
      const checkUser = await User.findOne({
        where: { email: data.email },
      });

      if (checkUser) return { error: 'User already exists' };

      const userRes = await User.create({
        username: data.username,
        password_hash: sha1(data.password),
        email: data.email,
        created_at: new Date().getTime(),
      });

      return { user: userRes };
    } catch (e) {
      return { error: 'An error occured' };
    }
  };

  User.login = async function (data) {
    var app = User.app;
    try {
      if (!data.username || !data.password)
        return { error: 'Missing credentials' };
      const checkUser = await User.findOne({
        where: { username: data.username },
      });

      if (!checkUser) return { error: 'User not found' };
      if (checkUser.password_hash !== sha1(data.password))
        return { error: 'Incorrect password' };
      const uuid = uuidv1();
      await app.models.Token.create({
        token: uuid,
        userId: checkUser.id,
        created_at: new Date().getTime(),
      });

      return { userToken: uuid };
    } catch (e) {
      return { error: 'An error occured' };
    }
  };

  User.updateUser = async function (data) {
    try {
      if (!data.username || !data.password || !data.email)
        return { error: 'Missing credentials' };
      const checkUser = await User.findOne({
        where: { username: data.username },
      });
      const checkAvailableEmail = await User.findOne({
        where: { email: data.email },
      });
      if (!checkUser) return { error: 'User not found' };
      if (
        checkAvailableEmail &&
        checkUser.username !== checkAvailableEmail.username
      )
        return { error: 'Email not available' };
      if (checkUser.password_hash !== data.password) {
        data.password = sha1(data.password);
      }
      const userRes = await User.update({
        password_hash: data.password,
        email: data.email,
      });
      return { success: 'Successfuly updated' };
    } catch (e) {
      return { error: 'An error occured' };
    }
  };

  User.remoteMethod('login', {
    accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
    returns: { type: 'object', root: true },
    http: { verb: 'POST' },
  });

  User.remoteMethod('register', {
    accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
    returns: { type: 'object', root: true },
    http: { verb: 'POST' },
  });

  User.remoteMethod('updateUser', {
    accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
    returns: { type: 'object', root: true },
    http: { verb: 'PUT' },
  });
};
