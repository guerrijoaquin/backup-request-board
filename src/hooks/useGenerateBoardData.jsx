/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  createCard,
  deleteCardById,
  fetchCardById,
  getAllCards,
  updateCard,
} from "../services/lanesServices";

const useGenerateBoardData = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isError, setIsError] = useState();
  const [isLoading, setIsLoading] = useState();

  const getData = async () => {
    setError({});
    setIsError(false);
    setIsLoading(true);
    try {
      let res = await getAllCards();
      setIsLoading(false);
      let dataMapped = res.lanes.map(lane => ({
        ...lane,
        id: `${lane.id}`
      })) 
      setData({lanes: dataMapped});
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const updateCardR = async (card) => {
    const { id, ...rest } = card;
    await genericFunction(async () => await updateCard(rest, card.id));
  };

  const createNewCard = async (card) => {
    await genericFunction(async () => await createCard(card));
  };

  const deleteCard = async (cardId) => {
    await genericFunction(async () => await deleteCardById(cardId));
  };

  const getCardById = async (cardId) => {
    try {
      return await fetchCardById(cardId);
    } catch (error) {
      throw new Error(`No se ha logrado encontrar la card: ${cardId}`);
    }
  };

  const genericFunction = async (callback) => {
    setError({});
    setIsError(false);
    setIsLoading(true);
    setData({});
    try {
      await callback();
      let res = await getAllCards();
      setIsLoading(false);
      setData(res);
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  return {
    getData,
    data,
    error,
    isError,
    isLoading,
    updateCardR,
    createNewCard,
    deleteCard,
    getCardById,
  };
};

export default useGenerateBoardData;
