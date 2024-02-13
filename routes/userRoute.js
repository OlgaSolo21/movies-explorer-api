const routerUser = require('express').Router();
const { getUserMe, updateUserProfile } = require('../controllers/users');
const { patchUpdateUserValidate } = require('../utils/validation');

// GET /users/me
routerUser.get('/me', getUserMe);

// PATCH /users/me
routerUser.patch('/me', patchUpdateUserValidate, updateUserProfile);

module.exports = routerUser;
