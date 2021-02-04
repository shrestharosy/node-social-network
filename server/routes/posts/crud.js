const uuid = require('uuid');
const postsController = require('../../controller/posts');

function createPost(message, codeFileName) {
  console.log('Creating Post');
  const dummyCreatedPost = {
    id: uuid.v4(),
    message,
    codeFileName,
    like: 0,
  };
  console.log('New post created');
  console.dir(dummyCreatedPost);
  return Promise.resolve(dummyCreatedPost);
}

async function getPosts(page, limit) {
  const posts = await postsController.readDirectory(limit);
  return {
    posts,
    meta: {
      total: posts.length,
      page,
      limit,
    },
  };
}

module.exports = {
  createPost,
  getPosts,
};
