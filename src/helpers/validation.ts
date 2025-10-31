export const validateTodo = (todoText: string | undefined): void => {
  if (!todoText) {
    throw new Error('Задаче нужно название');
  } else {
    if (todoText.length < 2) {
      throw new Error('Минимальная длина текста 2 символа');
    }
    if (todoText.length > 64) {
      throw new Error('Максимальная длина текста 64 символа');
    }
  }
}
