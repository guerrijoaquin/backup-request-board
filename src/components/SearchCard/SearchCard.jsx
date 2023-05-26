/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import {
  ActionIcon,
  Autocomplete,
  Box,
  Divider,
  Group,
  Loader,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { forwardRef, useRef, useState } from "react";
import useSearch from "../../hooks/useSearch";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import useGenerateBoardData from "../../hooks/useGenerateBoardData";
import { useDisclosure } from "@mantine/hooks";
import CardDrawer from "../CardDrawer/CardDrawer";
import { customNotif } from "../../utils/simplifiedNotifications";

const SearchCard = () => {
  const [value, setValue] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [cardEditable, setCardEditable] = useState();
  const { searchCard, data, isLoading, isError } = useSearch();
  const { getData, updateCardR } = useGenerateBoardData();
  const { getCardById } = useGenerateBoardData();
  const theme = useMantineTheme();
  const autocompleteRef = useRef();

  const handleSingleCard = async (cardId) => {
    try {
      let res = await getCardById(cardId);
      console.log("open");
      setCardEditable(res);
      open();
    } catch (error) {
      close();
      customNotif("error", "No se ha logrado cargar esta card");
    }
  };

  const AutoCompleteItem = forwardRef(
    (
      {
        description,
        title,
        user,
        lane,
        id,
        handle = () => handleSingleCard(id),
        ...others
      },
      ref
    ) => (
      <div
        ref={ref}
        onClick={handle}
        style={{ cursor: "pointer", margin: "5px 0" }}
      >
        <Group noWrap>
          <Text color="indigo" weight={"bolder"}>
            {lane}
          </Text>
          <Divider size="xs" orientation="vertical" />
          <div>
            <Text color="gray" size={"xs"}>
              {user?.username}
            </Text>
            <Text color="gray" weight={"bold"}>
              {title}
            </Text>
            <Text size="sm" color="dimmed">
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  const form = useForm({
    initialValues: {
      queryField: "",
    },
    validate: {
      queryField: (value) => {
        if (!value) {
          return "Debes escribir algo";
        }
        return /^[^';%_\\\\]+$/.test(value) // evita (' , ; , % , _ , \)
          ? null
          : "No se pueden poner carácteres especiales";
      },
    },
  });

  const handleKey = async (e) => {
    if (e.keyCode === 13) {
      form.validate();
      if (form.isValid()) {
        try {
          await searchCard(form.values.queryField);
          autocompleteRef.current.focus();
        } catch (error) {
          console.log(error);
        }
      }
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

  const handleSubmit = async (e) => {
    e?.preventDefault();
    form.validate();
    if (form.isValid()) {
      try {
        await searchCard(form.values.queryField);
        autocompleteRef.current.focus();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <CardDrawer
        cardEditable={cardEditable}
        callback={handleUpdate}
        close={close}
        opened={opened}
      />
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Autocomplete
          value={value}
          data={data ? data : []}
          onChange={(event) => setValue(event.currentTarget.value)}
          onKeyDown={handleKey}
          ListboxProps={{ style: { maxHeight: 200, overflow: "auto" } }}
          rightSection={
            <>
              {isLoading ? <Loader size="1.5rem" /> : null}
              <ActionIcon
                size={32}
                color={theme.primaryColor}
                variant="filled"
                type="submit"
                onClick={handleSubmit}
              >
                {theme.dir === "ltr" ? (
                  <IconArrowRight size="1.1rem" />
                ) : (
                  <IconArrowLeft size="1.1rem" />
                )}
              </ActionIcon>
            </>
          }
          itemComponent={AutoCompleteItem}
          label="Busca alguna petición"
          placeholder="Escribe aquí"
          rightSectionWidth={isLoading ? 60 : 37}
          sx={{ width: "80%" }}
          ref={autocompleteRef}
          filter={(value, item) => {
            return (
              value &&
              item?.title?.toLowerCase()?.includes(value?.toLowerCase()?.trim())
            );
          }}
          {...form.getInputProps("queryField")}
        />
      </Box>
    </>
  );
};

export default SearchCard;
