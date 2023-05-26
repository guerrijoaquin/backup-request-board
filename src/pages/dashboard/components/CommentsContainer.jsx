/* eslint-disable react/prop-types */
import { useLayoutEffect, useState } from "react";
import { getCommentsByCardId } from "../../../services/boardServices";
import { Comment } from "./Comment";
import { Box, Loader, Title } from "@mantine/core";
import { customNotif } from "../../../utils/simplifiedNotifications";

const CommentsContainer = ({ cardId }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (cardId) {
      setIsLoading(true);
      const fetch = async () => {
        try {
          let res = await getCommentsByCardId(cardId);
          setIsLoading(false);
          setData(res);
        } catch (error) {
          customNotif(
            "show",
            "No se ha logrado cargar los comentarios de esta card"
          );
        }
      };
      fetch();
    }
    return setIsLoading(false);
  }, []);

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
                createdAt={comment.created_at}
                description={comment.description}
                user={comment.username}
                key={comment.id}
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
