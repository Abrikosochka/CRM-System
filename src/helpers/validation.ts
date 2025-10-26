export const validateTodo = (todoText: string): string => {
  const title: string = todoText.trim();
  console.log(title)
  if (!title) {
    throw new Error('Задаче нужно название');
  }
  if (title.length < 2) {
    throw new Error('Минимальная длина текста 2 символа');
  }
  if (title.length > 64) {
    throw new Error('Максимальная длина текста 64 символа');
  }
  return title
}
