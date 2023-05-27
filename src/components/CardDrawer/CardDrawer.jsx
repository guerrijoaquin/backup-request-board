/* eslint-disable react/prop-types */
import { Button, Drawer, Title } from "@mantine/core";
import React, { useContext } from "react";
import { ActionContext } from "../../context/ContextProvider";
import { CardArticle } from "../../pages/dashboard/components/CardArticle";
import InputFields from "../InputFields";
import CommentsContainer from "../../pages/dashboard/components/CommentsContainer";
import { NewCommentModal } from "../NewComment/NewCommentModal";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const CardDrawer = ({ opened, close, cardEditable, callback }) => {
  const { user } = useContext(ActionContext);

  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);

  const [reload, setReload] = useState()

  return (
    <Drawer opened={opened} onClose={close} centered>
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
            dateString={cardEditable?.dateString}
            description={cardEditable?.description}
            lane={cardEditable?.lane}
            user={cardEditable?.user}
            key={cardEditable?.id}
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
            callback={callback}
          />
        </>
      )}

      <Button onClick={openModal} mt="xs">Comentar</Button>
      <NewCommentModal
        opened={openedModal}
        close={closeModal}
        cardId={cardEditable?.id}
        username={user.username}
        closeCard={close}/>
      <CommentsContainer cardId={cardEditable?.id}/>
    </Drawer>
  );
};

export default CardDrawer;
