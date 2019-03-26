const User = require('./models/user.model');
const users = require('./data/users.json');
const mongoose = require('mongoose');

// Init mongodb connection
require('./configs/db.config');

const email = 'jeannette.coleman@example.us';

User.create(users)
  .then(users => console.info(users))
  .then(() => {
    console.info('============')
    console.info('- Finding user by email', email)
    return User.findOne({ email: email })
      .then(user => console.info(user))
  })
  .then(() => {
    console.info('- Updating age for user by email', email)
    return User.findOneAndUpdate({ email: email }, { $inc: { age: 1 }}, { new: true })
      .then(user => console.info(user))
  })
  .then(() => {
    console.info('- Deleting user by email', email)
    return User.deleteOne({ email: email })
      .then(user => console.info(user))
  })
  .then(() => {
    console.info('- Finding users by email', email)
    return User.find({ email: email })
      .then(users => console.info(users))
  })
  .then(() => {
    const data = {
      name: 'John John',
      email: 'john.doe@example.org',
      age: 30,
      role: 'admin',
      isActive: true,
      avatarUrl: 'https://ui-avatars.com/api/?name=John+John',
      skills: [
        'scala',
        'js'
      ]
    }
    console.info('- Creating new user with data', data)
    return new User(data)
      .save()
      .then(user => console.info(user))
  })
  .then(() => mongoose.connection.dropDatabase())
  .then(() => mongoose.disconnect())
  .then(() => console.info('Successfully disconnected, bye!'))
  .catch(error => console.error(error))

