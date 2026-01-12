export const validateTodo = (todoText: string | undefined): void => {
  if (!todoText) {
    throw new Error('Задаче нужно название');
  } else {
    if (todoText.length < 2) {
      throw new Error('Минимальная длина 2 символа');
    }
    if (todoText.length > 64) {
      throw new Error('Максимальная длина 64 символа');
    }
  }
}

export const validateLogin = (login: string | undefined): void => {
  if (!login) {
    throw new Error('Введите логин');
  } else {
    if(!/^[a-zA-Z]+$/.test(login)){
      throw new Error('Только символы латинского алфавита');
    }
    if (login.length < 2) {
      throw new Error('Минимальная длина 2 символа');
    }
    if (login.length > 60) {
      throw new Error('Максимальная длина 60 символов');
    }
  }
}

export const validateUsername = (username: string | undefined): void => {
  if (!username) {
    throw new Error('Введите имя пользователя');
  } else {
    if(!/^[a-zA-Za-яА-ЯёЁ]+$/.test(username)){
      throw new Error('Только символы алфавита');
    }
    if (username.length > 60) {
      throw new Error('Максимальная длина 60 символов');
    }
  }
}

export const validatePassword = (username: string | undefined): void => {
  if (!username) {
    throw new Error('Введите пароль');
  } else {
    if (username.length < 6) {
      throw new Error('Минимальная длина 6 символов');
    }
    if (username.length > 60) {
      throw new Error('Максимальная длина 60 символов');
    }
  }
}