var assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const url = 'http://localhost:8081/api/';
const { expect } = require('chai');

chai.use(chaiHttp);

var createEntity = (endpoint, data, callback) => {
  chai
    .request(url + endpoint)
    .post('/')
    .send(data)
    .end(callback);
};

var getEntityById = (endpoint, id, callback) => {
  chai
    .request(url + endpoint)
    .get('/' + id)
    .end(callback);
};

var createTravel = (data, callback) => {
  chai
    .request(url + 'travels/')
    .post('createTravel')
    .send(data)
    .end(callback);
};

var addActivityToTravel = (data, callback) => {
  chai
    .request(url + 'plannings')
    .post('/addActivityToTravel')
    .send(data)
    .end(callback);
};

var createUser = (data, callback) => {
  chai
    .request(url + 'users/')
    .post('register')
    .send(data)
    .end(callback);
};

describe('[POST] /addActivityToTravel', function () {
  it('should create new planning with existing location and activity', function (done) {
    var userData = {
      username: Math.random().toString(36).substring(7),
      password: Math.random().toString(36).substring(7),
      email: Math.random().toString(36).substring(7),
    };

    var travelId, activityId;
    createUser(userData, async function (err, res) {
      var travelData = {
        dates: {
          start: '2021-06-11T13:16:03.986Z',
          end: '2021-06-11T13:16:03.986Z',
        },
        name: Math.random().toString(36).substring(7),
        userId: res.body.user.id,
        from: {
          name: Math.random().toString(36).substring(7),
          lon: Math.random(),
          lat: Math.random(),
        },
        to: {
          name: Math.random().toString(36).substring(7),
          lon: Math.random(),
          lat: Math.random(),
        },
      };

      createTravel(travelData, async function (err, res) {
        travelId = res.body.travel.id;
        var name = Math.random().toString(36).substring(7);
        var locationData = {
          name: 'location_' + name,
          lon: '20',
          lat: '20',
        };

        createEntity('locations', locationData, async function (err, res) {
          var activityData = {
            name: 'string',
            type: ['bar'],
            address: 'string',
            price: 'string',
            locationId: res.body.id,
          };
          createEntity('activities', activityData, async function (err, res) {
            activityId = res.body.id;
            var planningData = {
              activityId : activityId,
              travelId : travelId,
              date: "2021-06-11T13:16:03.986Z"
          }
            addActivityToTravel(planningData, async function (err, res) {
              var id = res.body.planning.id;

              getEntityById('plannings', id, function (err, res) {
                var planning = res.body;
                expect(planning.id).to.exist;
                expect(planning.activityId).to.equal(planningData.activityId);
                expect(planning.travelId).to.equal(planningData.travelId);
                expect(planning.transportId).to.not.exist;
                done();
              });
            });
          });
        });
      });
    });
  });

  it('should create new planning with existing location and transport', function (done) {
    var userData = {
      username: Math.random().toString(36).substring(7),
      password: Math.random().toString(36).substring(7),
      email: Math.random().toString(36).substring(7),
    };

    var travelId, activityId;
    createUser(userData, async function (err, res) {
      var travelData = {
        dates: {
          start: '2021-06-11T13:16:03.986Z',
          end: '2021-06-11T13:16:03.986Z',
        },
        name: Math.random().toString(36).substring(7),
        userId: res.body.user.id,
        from: {
          name: Math.random().toString(36).substring(7),
          lon: Math.random(),
          lat: Math.random(),
        },
        to: {
          name: Math.random().toString(36).substring(7),
          lon: Math.random(),
          lat: Math.random(),
        },
      };

      createTravel(travelData, async function (err, res) {
        travelId = res.body.travel.id;
        var name = Math.random().toString(36).substring(7);
        var locationData = {
          name: 'location_' + name,
          lon: '20',
          lat: '20',
        };

        createEntity('locations', locationData, async function (err, res) {
          var activityData = {
            name: 'string',
            type: ['bar'],
            address: 'string',
            price: 'string',
            locationId: res.body.id,
          };

          var transportData = {
            duration: 10,
            distance: 100,
            fromId: res.body.id,
            toId: res.body.id
          }
          createEntity('transports', transportData, async function (err, res) {
            transportId = res.body.id;

            createEntity('activities', activityData, async function (err, res) {
              activityId = res.body.id;
              var planningData = {
                travelId : travelId,
                date: "2021-06-11T13:16:03.986Z",
                transportId: transportId
            }
              addActivityToTravel(planningData, async function (err, res) {
                var id = res.body.planning.id;

                getEntityById('plannings', id, function (err, res) {
                  var planning = res.body;
                  expect(planning.id).to.exist;
                  expect(planning.activityId).to.be.null;
                  expect(planning.travelId).to.equal(planningData.travelId);
                  expect(planning.transportId).to.equal(transportId);
                  done();
                });
              });
            });
          })
        });
      });
    });
  });

  it('raise an error', function (done) {
    var planningData = {
      activityId : 132,
      date: "2021-06-11T13:16:03.986Z"
    }
    addActivityToTravel(planningData, async function (err, res) {
      expect(res.body).to.deep.include({error: 'Missing data'});
      done();
      
    });
  
  });
})
     
