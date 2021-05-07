var assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const url = "http://localhost:8081/api/users/"
var User = require('../common/models/user');
var sha1 = require('sha1');

chai.use(chaiHttp);

var deleteUser = (id) => {
    chai.request(url)
        .delete("/" + id);
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
        chai.request(url)
            .post("register")
            .send(data)
            .end(async function(err, res) {
                if (err) {
                    assert.strictEqual(1, 0);
                }
                var id = res.body.user.id;
                chai.request(url)
                .get("/" + id)
                .end(function(err, res) {
                    var user = res.body;
                    assert.strictEqual(user.email, data.email);
                    assert.strictEqual(user.username, data.username);
                    assert.strictEqual(user.password_hash, sha1(data.password));

                    deleteUser(user.id);
                    done();
                })
            })
    });
});