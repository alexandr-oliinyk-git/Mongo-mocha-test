const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('1) saves a user', done => {
        let joe = new User({ name: 'Joe' })
        joe.save() 
            .then(() => {
                assert(!joe.isNew);
                done();
            });
    });
});