var assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const url = "http://localhost:8081/api/users/"
var User = require('../common/models/user');
var sha1 = require('sha1');
const { expect, should } = require('chai');

chai.use(chaiHttp);

var deleteUser = (id) => {
    chai.request(url)
        .delete("/" + id);
}

var createUser = (data, callback) => {
    chai.request(url)
            .post("register")
            .send(data)
            .end(callback);
}

var getUser = (id, callback) => {
    chai.request(url)
        .get("/" + id)
        .end(callback)
}

describe('[POST] /register', function() {
    it('should create new user', function(done) {
        let email = Math.random().toString(36).substring(7),
        username = Math.random().toString(36).substring(7),
        password = Math.random().toString(36).substring(7);

        var data = {
            username: username,
            password: password,
            email: email
        }
        createUser(data, async function(err, res) {
            if (err) {
                assert.strictEqual(1, 0);
            }
            var id = res.body.user.id;
            getUser(id, function(err, res) {
                var user = res.body;
                expect(user.email).to.equal(data.email);
                expect(user.username).to.equal(data.username);
                expect(user.password_hash).to.equal(sha1(data.password));

                deleteUser(user.id);
                done();
            })
        })
    });
})

describe('[POST] /login', function() {
    it('should return api token', function(done) {
        let email = Math.random().toString(36).substring(7),
        username = Math.random().toString(36).substring(7),
        password = Math.random().toString(36).substring(7);

    var data = {
        username: username,
        password: password,
        email: email
    }
        createUser(data, async function(err, res) {
            if (err) {
                assert.strictEqual(1, 0);
            }
            chai.request(url)
                .post("login")
                .send(data)
                .end(function(err, res) {
                    var token = res.body;
                    expect(token.userToken).to.not.be.null;
                    done();
                })
        
        })
    });
})
