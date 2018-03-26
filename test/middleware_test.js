const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let joe, blogPost;
    beforeEach(done => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yes it Real' });

        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save()])
            .then(()=> done());
    });

    it('Users clean up blogpost remove', done =>{
        joe.remove()
            .then(() => BlogPost.count())
            .then(count =>{
                assert(count === 0);
                done();
            });
    });

});