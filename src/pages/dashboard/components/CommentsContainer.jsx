/* eslint-disable react/prop-types */
import { useContext, useLayoutEffect, useState } from "react";
import {
  deleteCommentById,
  getCommentsByCardId,
} from "../../../services/boardServices";
import { Comment } from "./Comment";
import { Box, Loader, Title } from "@mantine/core";
import { customNotif } from "../../../utils/simplifiedNotifications";
import { ActionContext } from "../../../context/ContextProvider";

const CommentsContainer = ({ cardId }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(ActionContext);

  useLayoutEffect(() => {
    if (cardId) {
      const fetch = async () => {
        return await getComments();
      };
      fetch();
    }
    return setIsLoading(false);
  }, []);

  const getComments = async () => {
    setIsLoading(true);
    try {
      let res = await getCommentsByCardId(cardId);
      setIsLoading(false);
      setData(res);
    } catch (error) {
      customNotif(
        "show",
        "No se ha logrado cargar los comentarios de esta card"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    setIsLoading(true);
    try {
      await deleteCommentById(commentId);
    } catch (error) {
      customNotif("error", "no se ha logrado eliminar el comentario");
    } finally {
      setIsLoading(false);
      await getComments();
    }
  };

  if (isLoading) {
    return (
      <Box
        w={"100%"}
        h={"100%"}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <>
      {data && data?.length > 0 ? (
        <Box sx={{ margin: "10px 0" }}>
          {data.map((comment) => {
            return (
              <Comment
                dateString={comment.dateString}
                description={comment.description}
                user={comment.username}
                userContextId={user?.username}
                commentId={comment.id}
                key={comment.id}
                handleDelete={handleDelete}
              />
            );
          })}
        </Box>
      ) : (
        <Title order={6} color="gray" weight={"lighter"} m={"5px"}>
          Sin comentarios
        </Title>
      )}
    </>
  );
};

export default CommentsContainer;
