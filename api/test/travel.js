var assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const url = "http://localhost:8081/api/travels/"
const { expect } = require('chai');

chai.use(chaiHttp);

var deleteTravel = (id, calback) => {
    chai.request(url)
        .delete("/" + id);
}

var deleteLocation = (id, calback) => {
    chai.request(url)
        .delete("http://localhost:8081/api/locations/" + id);
}
var createTravel = (data, callback) => {
    chai.request(url)
        .post("createTravel")
        .send(data)
        .end(callback);
}

var createLocation = (data, callback) => {

    chai.request("http://localhost:8081/api/locations")
        .post("/")
        .send(data)
        .end(callback);
}

var getTravel = (id, callback) => {
    chai.request(url)
        .get("/" + id)
        .end(callback)
}

describe('[POST] /createTravel', function() {
    it('should create new travel and new locations', function(done) {
        var data = {
            id: 0,
            dates: {
                  start: "2021-06-11T13:16:03.986Z",
                  end: "2021-06-11T13:16:03.986Z"
            },
            name: Math.random().toString(36).substring(7),
            userId: 1,
            from: {
                name: Math.random().toString(36).substring(7),
                lon: Math.random(),
                lat: Math.random(),

            },
            to: {
                name: Math.random().toString(36).substring(7),
                lon: Math.random(),
                lat: Math.random(),
            }
          }

        createTravel(data, async function(err, res) {
            if (err) {
                assert.strictEqual(1, 0);
            }
            var id = res.body.travel.id;
            getTravel(id, function(err, res) {
                var travel = res.body;
                expect(travel.name).to.equal(data.name);
                expect(travel.userId).to.equal(data.userId);

                deleteTravel(travel.id);
                done();
            })

        })
    });

    it('should create new travel with existing locations', function(done) {
            
        var name = Math.random().toString(36).substring(7);
        var dataLocation1 = {
            name: "location1_" + name,
            lon: "20",
            lat: "20"
        }

        var dataLocation2 = {
            name: "location1_" + name,
            lon: "20",
            lat: "20"
        }

        var locationId1, locationId2;
        
        createLocation(dataLocation1, async (err, res) => {
            locationId1 = res.body.id;

            createLocation(dataLocation2, async (err, res) => {
                locationId2 = res.body.id;
                var data = {
                    id: 0,
                    dates: {
                        start: "2021-06-11T13:16:03.986Z",
                        end: "2021-06-11T13:16:03.986Z"
                    },
                    name: name,
                    userId: 1,
                    from: {
                        name: dataLocation1.name

                    },
                    to: {
                        name: dataLocation2.name
                    }
                }

                createTravel(data, async function(err, res) {

                    if (err) {
                        assert.strictEqual(1, 0);
                    }
                    var id = res.body.travel.id;
                    getTravel(id, function(err, res) {
                        var travel = res.body;
                        expect(travel.name).to.equal(data.name);
                        expect(travel.userId).to.equal(data.userId);

                        deleteTravel(travel.id);
                        deleteLocation(locationId1);
                        deleteLocation(locationId2);

                        done();
                    })

            })
        });
                
        
        });
    })

    it('should return a missing credential', function(done) {
        var data = {
            id: 0,
            name: Math.random().toString(36).substring(7),
            userId: 1,
            from: {
                name: "location1"

            },
            to: {
                name: "location2"
            }
          }

        createTravel(data, async function(err, res) {
            if (err) {
                assert.strictEqual(1, 0);
            }
            var err = res.body.error;
            expect(err).to.exist;
            expect(err).to.equal("Missing credentials");
            done();

        })
    });

    it('should return a missing credential', function(done) {
        var data = {
            id: 0,
            name: Math.random().toString(36).substring(7),
            userId: 1,
            from: {
                name: "location1"

            },
            to: {
                name: "location2"
            }
          }

        createTravel(data, async function(err, res) {
            if (err) {
                assert.strictEqual(1, 0);
            }
            var err = res.body.error;
            expect(err).to.exist;
            expect(err).to.equal("Missing credentials");
            done();
        })
    });
})
