const { User } = require('../models');

const userData = [
  {
    username: "codingCat",
    email: "meow@coding.com",
    password: "Purrfect123",
  },
  {
    username: "hackerHamster",
    email: "squeak@hacks.com",
    password: "WheelRun456",
  },
  {
    username: "debuggingDuck",
    email: "quack@debug.com",
    password: "FixIt789",
  },
  {
    username: "frontendFroggy",
    email: "ribbit@frontend.com",
    password: "JumpJump321",
  },
  {
    username: "backendBear",
    email: "growl@backend.com",
    password: "HoneyPot654",
  },
  {
    username: "fullstackFox",
    email: "sly@fullstack.com",
    password: "ForestRun987",
  },
];

const seedUsers = async () => {
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
};

module.exports = seedUsers;