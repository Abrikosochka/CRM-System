export const addTask = async (value) => {
  try {
    if (value.title.length >= 2 && value.title.length <= 64) {
      const response = await fetch(
        'https://easydev.club/api/v1/todos',
        {
          method: 'POST',
          body: JSON.stringify(value),
        }
      );
      return response;
    }
    else if (value.title === "") {
      throw new Error('Задаче нужно название')
    }
    else if (value.title.length < 2) {
      throw new Error('Минимальная длина текста 2 символа')
    }
    else {
      throw new Error('Максимальная длина текста 64 символа')
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getTasks = async (value = 'all') => {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1/todos?filter=${value}`,
      {
        method: 'GET'
      }
    );
    if (response.ok) {
      let json = await response.json();
      return json;
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

export const deleteTask = async (id) => {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1/todos/${id}`,
      {
        method: 'DELETE'
      }
    )
    return response;
  } catch (e) {
    throw new Error(e.message)
  }
}

export const editTask = async (id, value) => {
  try {
    if (value.title.length >= 2 && value.title.length <= 64) {
      const response = await fetch(
        `https://easydev.club/api/v1/todos/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(value),
        }
      );
      return response;
    }
    else if (value.title === "") {
      throw new Error('Задаче нужно название')
    }
    else if (value.title.length < 2) {
      throw new Error('Минимальная длина текста 2 символа')
    }
    else {
      throw new Error('Максимальная длина текста 64 символа')
    }
  } catch (e) {
    throw new Error(e.message)
  }
}
