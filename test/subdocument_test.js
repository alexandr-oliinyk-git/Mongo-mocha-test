const assert = require('assert');
const User = require('../src/user');

describe('Subdoc', () => {
    it('can create a subdoc', done => {
        const joe = new User({ 
            name: 'Joe',
            posts: [{ title: 'PostTitle' }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            });
    });

    it('can add subdoc to exist record', done => {
        const joe = new User({
            name: 'Joe',
            post: []
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                user.posts.push({ title: 'New Post' });
                return user.save()
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                assert(user.posts[0].title === 'New Post')
                done();
            });
    });

    it('can remove exist subdoc', done => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'New Title'}]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                assert(user.posts.length === 0);
                done();
            })
    });
});