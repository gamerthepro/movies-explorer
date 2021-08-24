const errorMessages = {
  missingRequestData: 'Отсутсвуют обязательные данные',
  userIdExist: 'Пользователь с таким email уже существует',
  incorrectEmailPassword: 'Пароль или почта некорректны',
  incorrectUserData: 'Введенные данные о пользователе некорректны',
  cannotDeleteMovie: 'Чужие фильмы нельзя удалять',
  notFoundDatabaseUser: 'Пользователя нет в базе',
  incorrectData: 'Введенные данные некорректны',
  notExistUser: 'Такого пользователя не существует',
  incorrectId: 'Некорректный Id',
  requiredAuthorization: 'Необходима авторизация',
  somethingWrong: 'Что-то пошло не так',
  notFuound: 'Запрашиваемый ресурс не найден',
  invalidLinkInPicture: 'Неправильный формат ссылки на картинку',
  invalidLinkInTrailer: 'Неправильный формат ссылки на трейлер',
  invalidLinkInPoster: 'Неправильный формат ссылки на постер',
  invalidEmail: 'Неправильный формат почты',
  notFuoundUser: 'Пользователь не найден',
  notFoundMovie: 'Фильм не найден',
};

const answerMessages = {
  movieDeleted: 'Фильм удалён',
};

module.exports = { errorMessages, answerMessages };
