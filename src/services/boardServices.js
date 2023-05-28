import { fetchContent } from "../utils/fetchContent";

const credentials = {
  withCredentials: true,
};

export const getCardsByLane = async (laneId) => {
  try {
    const res = await fetchContent(`lanes/${laneId}`, credentials);
    return res;
  } catch (error) {
    throw new Error("No se ha podido encontrar esa columna");
  }
};

export const updateCard = async (card, cardId) => {
  const config = {
    method: "PATCH",
    ...credentials,
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
    ...credentials,
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
    ...credentials,
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
    const res = await fetchContent(`cards/${cardId}`, credentials);
    return res;
  } catch (error) {
    throw new Error("No se ha podido encontrar esa columna");
  }
};

export const getAllCards = async () => {
  const lanes = ["REGALO", "VENDO", "COMPRO", "ALQUILO"];

  try {
    let data = {
      lanes: [
        await getCardsByLane(lanes[0], credentials),
        await getCardsByLane(lanes[1], credentials),
        await getCardsByLane(lanes[2], credentials),
        await getCardsByLane(lanes[3], credentials),
      ],
    };
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("No se ha logrado buscar las columnas");
  }
};

export const searchCardsByQuery = async (cardQuery) => {
  try {
    return await fetchContent(`cards?q=${cardQuery}`, credentials);
  } catch (error) {
    throw new Error("No se han encontrado cards");
  }
};

export const getCommentsByCardId = async (cardId) => {
  try {
    const res = await fetchContent(`cards/${cardId}/comments`, credentials);
    return res;
  } catch (error) {
    throw new Error("No se ha podido encontrar los comentarios");
  }
};

export const createComment = async (cardId, comment, username) => {
  const config = {
    method: "POST",
    ...credentials,
    body: {
      description: comment,
      username,
    },
  };

  try {
    const res = await fetchContent(`cards/${cardId}/comments`, config);
    return res;
  } catch (error) {
    throw new Error("No se ha podido comentar la petición");
  }
};

export const deleteCommentById = async (commentId) => {
  const config = {
    method: "DELETE",
    ...credentials,
  };

  try {
    await fetchContent(`comments/${commentId}`, config);
  } catch (error) {
    throw new Error("No se ha logrado eliminar el comentario", error);
  }
};
