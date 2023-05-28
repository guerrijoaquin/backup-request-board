/* eslint-disable react/prop-types */
import { Modal, Button, Textarea, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { createComment } from "../../services/boardServices";
import { useState } from "react";
import { customNotif } from "../../utils/simplifiedNotifications";

export const NewCommentModal = ({
  opened,
  close,
  cardId,
  username,
  closeCard,
}) => {
  const [loading, setLoading] = useState(false);

  const postComment = async ({ description }) => {
    setLoading(true);

    try {
      const res = await createComment(cardId, description, username);
      customNotif("show", "Se publicó el comentario");
    } catch (e) {
      customNotif(
        "error",
        "No se pudo publicar el comentario. Intente nuevamente."
      );
    }

    setLoading(false);
    close();
    closeCard();
  };

  const form = useForm({
    initialValues: {
      description: "",
    },

    validate: {
      description: (value) =>
        value.length != 0 ? null : "Ingrese un comentario",
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Comentar petición">
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <form onSubmit={form.onSubmit(postComment)}>
          <Textarea
            placeholder="Tu comentario"
            label="Comentario"
            withAsterisk
            autosize
            {...form.getInputProps("description")}
          />
          <Button type="submit" mt={"xs"} fullWidth>
            PUBLICAR COMENTARIO
          </Button>
        </form>
      </Modal>
    </>
  );
};
