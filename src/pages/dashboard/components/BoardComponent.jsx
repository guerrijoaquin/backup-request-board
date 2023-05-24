import Board from "react-trello";
import useGenerateBoardData from "../../../hooks/useGenerateBoardData";
import { Drawer, Loader, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import InputFields from "../../../components/InputFields";
import CommentsContainer from "./CommentsContainer";
import { CardArticle } from "./CardArticle";
import { ActionContext } from "../../../context/ContextProvider";

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
  const { user } = useContext(ActionContext);

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
    try {
      const res = await getCardById(cardId);
      console.log(res);
      setCardEditable(res);
      open();
    } catch {
      alert(`No se ha logrado obtener la info. de esta card`);
      setCardEditable(false);
      close();
    }
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
          {user.id === cardEditable.user.id ? (
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
