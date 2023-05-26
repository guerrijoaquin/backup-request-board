/* eslint-disable no-unused-vars */
import Board from "react-trello";
import useGenerateBoardData from "../../../hooks/useGenerateBoardData";
import { Loader, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { ActionContext } from "../../../context/ContextProvider";
import { customNotif } from "../../../utils/simplifiedNotifications";
import { EventBusHandler } from "../../../utils/EventBusHandler";
import CardDrawer from "../../../components/CardDrawer/CardDrawer";

const BoardComponent = () => {
  const { isLoading, isError, getData, updateCardR, deleteCard, getCardById } =
    useGenerateBoardData();
  const [opened, { open, close }] = useDisclosure(false);
  const [cardEditable, setCardEditable] = useState(false);
  const { user, board, setBoard /*setEventBus, eventBus*/ } =
    useContext(ActionContext);

  const handleDragEnd = async (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) => {
    console.log(cardId, sourceLaneId, targetLaneId, position, cardDetails);
    if (sourceLaneId === targetLaneId) {
      await getData();
      return customNotif(
        "error",
        "No se puede mover una card en la misma columna."
      );
    }
    if (cardDetails?.user?.id !== user?.id) {
      await getData();
      return customNotif("error", "No puede mover una card que no sea suya.");
    }
    try {
      let res = await updateCardR({ lane: "" + targetLaneId, id: cardId });
      console.log(res);
      return true;
    } catch (error) {
      console.log(error);
      customNotif("error", "No se ha podido mover de columna esta card.");
      return false;
    }
  };
  const handleCardDelete = async (cardId) => {
    console.log(cardId);
    try {
      await deleteCard(cardId);
    } catch (error) {
      customNotif(
        "error",
        error?.message || "No se ha podido eliminar esta card."
      );
    }
  };
  const handleCardClick = async (cardId) => {
    setCardEditable(false);
    console.log(cardId);
    try {
      const res = await getCardById(cardId);
      console.log(res);
      setCardEditable(res);
      open();
    } catch {
      customNotif("error", "No se ha logrado obtener la info. de esta card");
      setCardEditable(false);
      close();
    }
  };
  const handleUpdate = async (card) => {
    let { created_at, ...rest } = card;
    try {
      await updateCardR(rest);
      await getData();
      close();
    } catch (error) {
      customNotif(
        "No se ha podido actualizar, intente nuevamente y verifique la información"
      );
    }
  };
  useEffect(() => {
    let fetch = async () => {
      await getData();
    };
    fetch();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <Title order={2} color="red" size={"2rem"} sx={{ textAlign: "center" }}>
        Hubo un error al cargar las columnas
      </Title>
    );
  }
  return (
    <>
      {cardEditable && opened ? (
        <CardDrawer
          opened={opened}
          cardEditable={cardEditable}
          close={close}
          callback={handleUpdate}
        />
      ) : (
        ""
      )}
      {board && board?.lanes && (
        <Board
          data={board}
          style={{ backgroundColor: "#fff" }}
          onCardDelete={handleCardDelete}
          handleDragEnd={handleDragEnd}
          laneDraggable={false}
          onCardClick={handleCardClick}
          eventBusHandle={(h) => EventBusHandler(h, user.id)}
        />
      )}
    </>
  );
};

export default BoardComponent;
