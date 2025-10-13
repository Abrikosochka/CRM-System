export const addTask = async (value) => {
  try {
    if (value.title.length >= 2 && value.title.length <= 64) {
      const response = await fetch(
        'https://easydev.club/api/v1/todos',
        {
          method: 'POST',
          mode: "cors",
          body: JSON.stringify(value),
        }
      );
      console.log('ok', response)
    }
    else if (value.title === "") {
      throw new Error('Задаче нужно название')
    }
    else if (value.title.length < 2) {
      throw new Error('Слишком короткое название')
    }
    else {
      throw new Error('Слишком длинное название')
    }
  } catch (e) {
    throw new Error(e.message)
  }
}
