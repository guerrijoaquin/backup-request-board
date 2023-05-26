/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  NativeSelect,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

const InputFields = ({ defaultValues, callback, btnText }) => {



  useEffect(() => {
    console.log('btntext', btnText)
    console.log()
    if (defaultValues) {
      form.setValues({ ...defaultValues });
    }
  }, []);

  const form = useForm({
    validate: {
      title: (value) =>
        value?.length >= 5
          ? null
          : "El título tiene que tener al menos 5 letras, por favor.",
      label: (value) =>
        value?.length > 0 ? null : "Ingrese su nombre, por favor.",
      lane: (value) => {
        console.log(value);
        return value?.length > 0 ? null : "Seleccione una columna, por favor.";
      },
      description: (value) =>
        value?.length > 10
          ? null
          : "Ingrese una descripción breve, mayor a 10 letras, por favor.",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.validate();
    console.log(form.values);
    if (form.isValid()) {
      form.values?.user ? delete form.values?.user : "";
      await callback(form.values);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextInput
        placeholder="El título de la petición"
        label="Introduzca el título"
        name="title"
        withAsterisk
        {...form.getInputProps("title")}
      />
      <Textarea
        placeholder="La descripción"
        label="Introduzca la descripción"
        name="description"
        withAsterisk
        {...form.getInputProps("description")}
      />
      <TextInput
        placeholder="Tu nombre"
        label="Introduzca su nombre"
        name="label"
        withAsterisk
        {...form.getInputProps("label")}
      />
      <Select
        sx={{
          display: btnText == 'Editar' ? 'none' : 'inherit'
        }}
        data={["VENDO", "COMPRO", "ALQUILO", "REGALO"]}
        placeholder="Seleccionar"
        label="Selecciona tu columna"
        name="lane"
        withAsterisk
        {...form.getInputProps("lane")}
      />
      <Button type="submit" variant="filled" color="indigo" m={"10px 0"}>
        {btnText}
      </Button>
    </Box>
  );
};

export default InputFields;
