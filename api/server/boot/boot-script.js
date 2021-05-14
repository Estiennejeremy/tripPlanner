module.exports = function (app) {
  var mysql = app.dataSources.mysql;
  mysql.autoupdate('token', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Token`.\n');
  });
  mysql.autoupdate('user', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Users`.\n');
  });
  mysql.autoupdate('location', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Location`.\n');
  });
  mysql.autoupdate('travel', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Travel`.\n');
  });
  mysql.autoupdate('planning', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Planning`.\n');
  });
  mysql.autoupdate('transport', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Transport`.\n');
  });
  mysql.autoupdate('activity', function (err) {
    if (err) throw err;
    console.log('Autoupdated table `Activity`.\n');
  });

};
