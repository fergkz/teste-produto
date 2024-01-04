"use client";

import Grid from "@/components/Grid";
import PageSubtitle from "@/components/PageSubtitle";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import axios from "axios";
import { Button, FloatingLabel, Spinner } from "flowbite-react";
import { useState } from "react";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

export default function ProductCreate() {
  const [attributes, setAttributes] = useState([]);
  const [files, setFiles] = useState([]);
  const [isFilepondReady, setIsFilepondReady] = useState(false);

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
    e.preventDefault();
    if (e.target.checkValidity()) {
      const formData = new FormData();
      attributes.forEach((attribute, index) => {
        formData.append(`title[${index}]`, attribute.title);
        formData.append(`value[${index}]`, attribute.value);
      });
      files.forEach((file, index) => {
        formData.append(`file[${index}]`, file.file);
      });

      axios
        .post(`${process.env.backendUrl}/product/store`, formData)
        .then(() => (window.location = "/product"));
    }
  };

  return (
    <Section>
      <PageTitle>Cadastrar Produto</PageTitle>
      <PageSubtitle>Atributos:</PageSubtitle>
      <form onSubmit={(e) => handleSubmit(e)}>
        {attributes.map((attribute, index) => (
          <Grid key={index} gridCols="grid-cols-3 xl:grid-cols-6">
            <FloatingLabel
              variant="standard"
              label="Nome"
              name="title"
              value={attribute.title}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            <FloatingLabel
              variant="standard"
              label="Valor"
              name="value"
              value={attribute.value}
              onChange={(e) => handleInputChange(e, index)}
              required
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
        <div className={!isFilepondReady ? "hidden" : ""}>
          <FilePond
            allowMultiple
            files={files}
            onupdatefiles={setFiles}
            imagePreviewHeight={150}
            oninit={() => setIsFilepondReady(true)}
            acceptedFileTypes={["image/png", "image/jpeg", "application/pdf"]}
            labelIdle='Arraste e solte seus arquivos aqui ou <span class="filepond--label-action">Clique para buscar no dispositivo</span>'
          />
        </div>
        {!isFilepondReady && <Spinner />}
        <Button type="submit" className="my-4" color="gray">
          Cadastrar Produto
        </Button>
      </form>
    </Section>
  );
}
