/* eslint-disable react/prop-types */
import { Drawer, Title } from "@mantine/core";
import React, { useContext } from "react";
import { ActionContext } from "../../context/ContextProvider";
import { CardArticle } from "../../pages/dashboard/components/CardArticle";
import InputFields from "../InputFields";
import CommentsContainer from "../../pages/dashboard/components/CommentsContainer";

const CardDrawer = ({ opened, close, cardEditable, callback }) => {
  const { user } = useContext(ActionContext);

  return (
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
            createdAt={cardEditable?.created_at}
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

      <CommentsContainer cardId={cardEditable?.id} />
    </Drawer>
  );
};

export default CardDrawer;
