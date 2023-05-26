import { notifications } from "@mantine/notifications";

export const customNotif = (type = "show", message) => {
  type = type.toLowerCase();

  const types = {
    show: "blue",
    error: "red",
    warning: "yellow",
    success: "green",
  };

  notifications.show({
    color: types[type] || "blue",
    message,
    autoClose: 3000,
    withCloseButton: true,
  });
};
