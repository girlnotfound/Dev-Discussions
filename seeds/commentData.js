const { Comment } = require('../models');

const commentData = [
  {
    content: "What a cool blog!",
    post_id: 1,
    user_id: 2,
  },
  {
    content: "This blog is kinda amazing!",
    post_id: 1,
    user_id: 4,
  },
  {
    content: "So Fun!",
    post_id: 2,
    user_id: 5,
  },
];

const seedComments = async () => {
  await Comment.bulkCreate(commentData);
};

module.exports = seedComments;