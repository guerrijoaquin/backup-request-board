/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import {
  ActionIcon,
  Autocomplete,
  Box,
  Group,
  Loader,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { forwardRef, useState } from "react";
import useSearch from "../../hooks/useSearch";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const SearchCard = () => {
  const [value, setValue] = useState("");
  const { searchCard, data, isLoading, isError } = useSearch();
  const theme = useMantineTheme();

  const AutoCompleteItem = forwardRef(
    ({ description, title, user, lane, ...others }, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Text>{lane}</Text>
          <div>
            <Text>{user?.username}</Text>
            <Text>{title}</Text>
            <Text size="xs" color="dimmed">
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
      queryField: (value) =>
        /^[^';%_\\\\]+$/.test(value) // evita (' , ; , % , _ , \)
          ? null
          : "No se pueden poner carácteres especiales",
    },
  });

  const handleKey = async (e) => {
    if (e.keyCode === 13) {
      form.validate();
      if (form.isValid()) {
        try {
          await searchCard(form.values.queryField);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    form.validate();
    if (form.isValid()) {
      try {
        await searchCard(form.values.queryField);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box sx={{ width: "100%" }} component="form" onSubmit={handleSubmit}>
      <Autocomplete
        value={value}
        data={data ? data : []}
        onChange={(event) => setValue(event.currentTarget.value)}
        onKeyDown={handleKey}
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
        filter={(value, item) => {
          return (
            value &&
            item?.title?.toLowerCase()?.includes(value?.toLowerCase()?.trim())
          );
        }}
        {...form.getInputProps("queryField")}
      />
    </Box>
  );
};

export default SearchCard;
