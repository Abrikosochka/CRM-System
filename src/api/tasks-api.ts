interface addTaskResponse {
  created: string,
  id: bigint,
  isDone: boolean,
  title: string
}

export const addTask = async (value: { isDone: boolean, title: string }): Promise<addTaskResponse> => {
  if (value.title.length >= 2 && value.title.length <= 64) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}todos`,
      {
        method: 'POST',
        body: JSON.stringify(value),
      }
    );
    if (response.ok) {
      const result = await response.json();
      return result;
    }
    else {
      throw new Error('Ошибка при добавлении задачи' + response.status)
    }
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
}

export const getTasks = async (value = 'all') => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}todos?filter=${value}`,
    {
      method: 'GET'
    }
  );
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    throw new Error("Ошибка HTTP: " + response.status);
  }
}

export const deleteTask = async (id: bigint) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}todos/${id}`,
    {
      method: 'DELETE'
    }
  )
  return response;
}

export const editTask = async (id: bigint, value: { isDone: boolean, title: string }) => {
  if (value.title.length >= 2 && value.title.length <= 64) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}todos/${id}`,
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
}
