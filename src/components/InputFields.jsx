/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, NativeSelect, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

const InputFields = ({ defaultValues, callback, btnText }) => {
  useEffect(() => {
    if (defaultValues) {
      form.setValues({ ...defaultValues, lane: defaultValues.lane.title });
    }
  }, []);

  const form = useForm({
    validate: {
      title: (value) => {
        console.log("title: " + value);
        value.length < 5
          ? "El título tiene que tener al menos de 5 letras"
          : null;
      },
      label: (value) =>
        value.length <= 0 ? "Ingrese su nombre, por favor." : null,
      lane: (value) =>
        value.length <= 0 ? "Seleccione una columna, por favor." : null,
      description: (value) =>
        value.length <= 10
          ? "Ingrese una descripción breve, mayor a 10 letras, por favor."
          : null,
    },
    transformValues: (values) => ({
      lane: "" + values.lane,
    }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = form.validate();
    console.log(form.values, res, form.isValid());
    if (form.isValid()) {
      await callback(form.values)
        .then(() => {
          //   window.location.reload();
        })
        .catch((error) => {
          alert("No se ha logrado crear la petición: " + error.message);
        });
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
      <NativeSelect
        data={["VENDO", "COMPRO", "ALQUILO", "REGALO"]}
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
