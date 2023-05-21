import Board from "react-trello";
import useGenerateBoardData from "../hooks/useGenerateBoardData";
import { Drawer, Loader, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import InputFields from "./InputFields";

const BoardComponent = () => {
  const {
    data,
    isLoading,
    isError,
    getData,
    updateCardR,
    deleteCard,
    getCardById,
  } = useGenerateBoardData();
  const [opened, { open, close }] = useDisclosure(false);
  const [cardEditable, setCardEditable] = useState(false);

  const handleCardMove = async (fromLaneId, toLaneId, cardId) => {
    if (fromLaneId === toLaneId) {
      return;
    }
    await updateCardR({ lane: "" + toLaneId, id: cardId });
  };

  const handleCardDelete = async (cardId) => {
    console.log(cardId);
    await deleteCard(cardId);
  };

  const handleCardClick = async (cardId) => {
    setCardEditable(false);
    console.log(cardId);
    return await getCardById(cardId)
      .then((res) => {
        console.log(res);
        setCardEditable(res);
        open();
      })
      .catch(() => {
        alert(`No se ha logrado obtener la info. de esta card`);
        setCardEditable(false);
        close();
      });
  };

  const handleUpdate = (card) => {
    updateCardR(card)
      .then(() => {
        close();
      })
      .catch(() =>
        alert(
          "No se ha podido actualizar, intente nuevamente y verifique la información"
        )
      );
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
        </Drawer>
      ) : (
        ""
      )}
      {data && (
        <Board
          data={data}
          style={{ backgroundColor: "#fff" }}
          onCardMoveAcrossLanes={handleCardMove}
          onCardDelete={handleCardDelete}
          laneDraggable={false}
          onCardClick={handleCardClick}
        />
      )}
    </>
  );
};

export default BoardComponent;
