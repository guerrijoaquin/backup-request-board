import { fetchContent } from "../utils/fetchContent";

export const getCardsByLane = async (laneId) => {
  try {
    const res = await fetchContent(`lanes/${laneId}`);
    return res;
  } catch (error) {
    throw new Error("No se ha podido encontrar esa columna");
  }
};

export const updateCard = async (card, cardId) => {
  const config = {
    method: "PATCH",
    body: {
      ...card,
    },
  };

  try {
    const res = await fetchContent(`cards/${cardId}`, config);
    return res;
  } catch (error) {
    throw new Error("No se ha podido encontrar esa columna");
  }
};

export const createCard = async (card) => {
  const config = {
    method: "POST",
    body: { ...card },
  };

  try {
    const res = await fetchContent(`cards`, config);
    return res;
  } catch (error) {
    throw new Error("No se ha podido encontrar esa columna");
  }
};

export const deleteCardById = async (cardId) => {
  const config = {
    method: "DELETE",
  };

  try {
    const res = await fetchContent(`cards/${cardId}`, config);
    return res;
  } catch (error) {
    throw new Error("No se ha podido encontrar esa columna");
  }
};

export const fetchCardById = async (cardId) => {
  try {
    const res = await fetchContent(`cards/${cardId}`);
    return res;
  } catch (error) {
    throw new Error("No se ha podido encontrar esa columna");
  }
};

export const getAllCards = async () => {
  try {
    let data = {
      lanes: [
        await getCardsByLane("1"),
        await getCardsByLane("2"),
        await getCardsByLane("3"),
        await getCardsByLane("4"),
      ],
    };
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("No se ha logrado buscar las columnas");
  }
};
