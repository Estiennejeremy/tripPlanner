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
};
