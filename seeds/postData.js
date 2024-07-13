const { Post } = require('../models');

const postData = [
  {
    title: 'Why is MVC so important?',
    content: 'MVC is important because it organizes the codebase into clear, separate components, making it easier to develop, maintain, and scale the application.',
    user_id: 1,
  },
  {
    title: 'What is ORM?',
    content: `Object-Relational Mapping provides a powerful way to interact with relational databases using object-oriented principles.`,
    user_id: 2,
  },
];

const seedPosts = async () => {
  await Post.bulkCreate(postData);
};

module.exports = seedPosts;