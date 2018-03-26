const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let joe, blogPost, comment;
    beforeEach(done => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yes it Real' });
        comment = new Comment({ content: 'Congrat on a great post' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(()=> done());
    });

    it('saves relation user & blogpost', done => {
        User.findOne({ name: 'Joe' })
            .populate('blogPosts')
            .then(user => {
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            });
    });

    it('saves full tree', done => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then(user => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'JS is Great');
                assert(user.blogPosts[0].comments[0].content === 'Congrat on a great post');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            });
    });
});