import Board from "react-trello";
import useGenerateBoardData from "../../../hooks/useGenerateBoardData";
import { Drawer, Loader, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import InputFields from "../../../components/InputFields";
import CommentsContainer from "./CommentsContainer";
import { CardArticle } from "./CardArticle";
import { ActionContext } from "../../../context/ContextProvider";
import { notifications } from "@mantine/notifications";
import { customNotif } from "../../../utils/simplifiedNotifications";

const BoardComponent = () => {
  const { isLoading, isError, getData, updateCardR, deleteCard, getCardById } =
    useGenerateBoardData();
  const [opened, { open, close }] = useDisclosure(false);
  const [cardEditable, setCardEditable] = useState(false);
  const { user, board, setFunctions } = useContext(ActionContext);

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
  const setEventBus = (handle) => {
    setFunctions(handle);
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
        <Drawer opened={opened} onClose={close}>
          {user?.id !== cardEditable?.user?.id ? (
            <>
              <Title
                order={2}
                color="gray"
                size={"1.5rem"}
                sx={{ textAlign: "center", margin: "5px 0" }}
              >
                Request Board
              </Title>
              <CardArticle
                createdAt={cardEditable.created_at}
                description={cardEditable.description}
                lane={cardEditable.lane}
                user={cardEditable.user}
                key={cardEditable.id}
              />
            </>
          ) : (
            <>
              <Title
                order={2}
                color="gray"
                size={"1.5rem"}
                sx={{ textAlign: "center" }}
              >
                Editar petición
              </Title>
              <InputFields
                defaultValues={cardEditable}
                btnText={"Editar"}
                callback={handleUpdate}
              />
            </>
          )}

          <CommentsContainer cardId={cardEditable.id} />
        </Drawer>
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
          eventBusHandle={setEventBus}
        />
      )}
    </>
  );
};

export default BoardComponent;
