const router = require('express').Router();
const routerUser = require('./userRoute');
const { signupUser, signinUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const routerMovie = require('./movieRoute');
const NotFoundError = require('../errors/404_NotFoundError');
const { signInUpValid } = require('../utils/validation');

// POST /signup/signin
router.post('/signup', signInUpValid, signupUser);
router.post('/signin', signInUpValid, signinUser);

// Защитите API авторизацией(все что ниже - роуты, которым авторизация нужна)
router.use(auth);

// подключение роутов юзера и фильмов
router.use('/users', routerUser);
router.use('/movies', routerMovie);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
