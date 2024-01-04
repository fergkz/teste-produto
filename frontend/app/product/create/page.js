"use client";

import Grid from "@/components/Grid";
import PageSubtitle from "@/components/PageSubtitle";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import axios from "axios";
import { Button, FloatingLabel } from "flowbite-react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function ProductCreate() {
  const [attributes, setAttributes] = useState([]);

  const addAttribute = () => {
    setAttributes([...attributes, { title: "", value: "" }]);
  };
  const removeAttribute = (index) => {
    let newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  const handleInputChange = (e, index) => {
    let newAttributes = [...attributes];

    newAttributes[index][e.target.name] = e.target.value;
    setAttributes(newAttributes);
  };

  const handleSubmit = (e) => {
    const formData = new FormData();
    attributes.forEach((attribute, index) => {
      formData.append(`title[${index}]`, attribute.title);
      formData.append(`value[${index}]`, attribute.value);
    });

    axios
      .post(`${process.env.backendUrl}/product/store`, formData)
      .then(() => (window.location = "/product"));
  };

  return (
    <Section>
      <PageTitle>Cadastrar Produto</PageTitle>
      <PageSubtitle>Atributos:</PageSubtitle>
      {attributes.map((attribute, index) => (
        <Grid key={index} gridCols="grid-cols-3 xl:grid-cols-6">
          <FloatingLabel
            variant="standard"
            label="Nome"
            name="title"
            value={attribute.title}
            onChange={(e) => handleInputChange(e, index)}
          />
          <FloatingLabel
            variant="standard"
            label="Valor"
            name="value"
            value={attribute.value}
            onChange={(e) => handleInputChange(e, index)}
          />
          <Button
            onClick={() => removeAttribute(index)}
            className="mb-4"
            color="failure">
            Remover
          </Button>
        </Grid>
      ))}
      <Button onClick={() => addAttribute()} className="mb-4" color="success">
        Adicionar
      </Button>
      <PageSubtitle>Arquivos:</PageSubtitle>
      <Button onClick={() => handleSubmit()} className="my-4" color="gray">
        Cadastrar Produto
      </Button>
    </Section>
  );
}
