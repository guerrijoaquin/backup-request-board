/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import {
  createCard,
  deleteCardById,
  fetchCardById,
  getAllCards,
  updateCard,
} from "../services/boardServices";
import { ActionContext } from "../context/ContextProvider";

const useGenerateBoardData = () => {
  const { setBoard, board, functions } = useContext(ActionContext);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isError, setIsError] = useState();
  const [isLoading, setIsLoading] = useState();

  const getData = async () => {
    try {
      if (board?.lanes) {
        let res = await getAllCards();
        console.log("board.lanes exist and data retrived was: " + res);
        functions?.publish({ type: "UPDATE_LANES", lanes: res });
        setBoard(res);
        return;
      }
      setError({});
      setIsError(false);
      setIsLoading(true);

      let res = await getAllCards();
      setIsLoading(false);
      return setBoard(res);
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const updateCardR = async (card) => {
    const { id, ...rest } = card;
    try {
      await updateCard(rest, card.id);
      await getData();
    } catch (error) {
      console.log(error);
      throw new Error("No se ha podido actualizar esta card");
    }
  };

  const createNewCard = async (card) => {
    try {
      await createCard(card);
      await getData();
    } catch (error) {
      console.log(error);
      throw new Error("No se ha podido crear esta card");
    }
  };

  const deleteCard = async (cardId) => {
    try {
      await deleteCardById(cardId);
      await getData();
    } catch (error) {
      console.log(error);
      throw new Error("No se ha podido eliminar esta card");
    }
  };

  const getCardById = async (cardId) => {
    try {
      return await fetchCardById(cardId);
    } catch (error) {
      throw new Error(`No se ha logrado encontrar la card: ${cardId}`);
    }
  };

  // const genericFunction = async (callback) => {
  //   setError({});
  //   setIsError(false);
  //   setIsLoading(true);
  //   setData({});
  //   try {
  //     await callback();
  //     let res = await getAllCards();
  //     setIsLoading(false);
  //     setData(res);
  //   } catch (error) {
  //     setError(error);
  //     setIsError(true);
  //     setIsLoading(false);
  //   }
  // };

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
