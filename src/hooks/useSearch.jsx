import { useState } from "react";
import { searchCardsByQuery } from "../services/boardServices";

const useSearch = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchCard = async (cardTitle) => {
    setIsLoading(true);
    setIsError(false);
    try {
      let res = await searchCardsByQuery(cardTitle);
      console.log(res);
      setIsLoading(false);
      setData(res);
    } catch (error) {
      setIsError(true);
      throw new Error(
        `No se han encontrado cards con este parámetro: ${cardTitle}`
      );
    }
  };

  return {
    data,
    isLoading,
    isError,
    searchCard,
  };
};

export default useSearch;
