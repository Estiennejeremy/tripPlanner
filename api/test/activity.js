var assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const url = "http://localhost:8081/api/activities"
const { expect } = require('chai');


var deleteActivity = (id, calback) => {
    chai.request(url)
        .delete("/" + id);
}


var getActivity = (id, callback) => {
    chai.request(url)
        .get("/" + id)
        .end(callback)
}

var deleteLocation = (id, calback) => {
    chai.request(url)
        .delete("http://localhost:8081/api/locations/" + id);}



var getCityCoords = (query, callback) => {
    chai.request("http://localhost:8081/api/locations")
        .get("/SearchCity?query=" + query)
        .end(callback)
}

var getActivitesByCoords = (data, callback) => {
    chai.request(url)
        .get("/getActivitesByCity?coord=" + data.coords + "&radius=" + data.radius + "&type=" + data.type)
        .end(callback)
}

describe('[GET] /getActivitesByCity', function() {
    it('should get location coords by name', function(done) {
        var data = {
            query: "new york",
          }
          
        getCityCoords(data.query, function(err, res) {
            if (err) {
                assert.strictEqual(1, 0);
            }
            var loc = res.body;
            expect(loc.lon).to.equal("-74.0059728");
            expect(loc.lat).to.equal("40.7127753");
            deleteLocation(loc.id);
        })
        done();
    });

    it('location should get return a error', function(done) {

          var data2 = {
            query: "hniulnfleznfilenfleznflzfzefzefiubl",
          }



        getCityCoords(data2.query, function(err, res) {
            if (err) {
                assert.strictEqual(1, 0);
            }
            var loc = res.body;
            var err = res.body.error;
            expect(err).to.exist;
            expect(err).to.equal("Missing data");
        })
        done();
    });

    it('should get all activity by coords', function(done) {

        var data = {
            coords: "40.7127753,-74.0059728", // coordonnates of newyork
            radius:  Math.random(),
            type:"bar"
          }
          getActivitesByCoords(data, function(err, res) {
            if (err) {
                assert.strictEqual(1, 0);
            }
            expect(res).to.exist
            done();
          });
    });

    it('activity should get return a error', function(done) {

        var data = {
            coords: "-74.0059728,40.7127753", // coordonnates of nowhere
            radius:  Math.random(),
            type:"bar"
          }

          getActivitesByCoords(data, function(err, res) {
            if (err) {
                assert.strictEqual(1, 0);
            }

            var err = res.body.error;
            expect(err).to.exist;
            expect(err).to.equal("Missing data");
            done();
          });
    
  });
});