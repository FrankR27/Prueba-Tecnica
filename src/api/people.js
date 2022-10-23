const URI = "https://swapi.dev/api/people";

export const getPeople = async (page) => {
  try {
    const response = await fetch(`${URI}/?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCharacter = async (id = 1) => {
  try {
    const response = await fetch(`${URI}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const searchCharacter = async (name) => {
  try {
    const response = await fetch(`${URI}/?search=${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
