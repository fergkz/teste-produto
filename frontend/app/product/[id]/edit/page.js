"use client";

import Grid from "@/components/Grid";
import PageSubtitle from "@/components/PageSubtitle";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import axios from "axios";
import { Button, FloatingLabel, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

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

export default function ProductEdit({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [attributes, setAttributes] = useState([]);
  const [assets, setAssets] = useState([]);
  const [isFilepondReady, setIsFilepondReady] = useState(false);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      await axios
        .get(`${process.env.backendUrl}/product/${id}`)
        .then((response) => response.data)
        .then((data) => setProduct(data));
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    setAttributes(product?.attributes);
    let assetsToFiles = [];
    product?.assets?.forEach((asset) => {
      assetsToFiles.push({ source: `//${asset.path}` });
    });
    setAssets(assetsToFiles);
  }, [product]);

  useEffect(() => {
    fetchProduct();
  }, []);

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
        formData.append(`id[${index}]`, attribute.id ?? "");
        formData.append(`title[${index}]`, attribute.title);
        formData.append(`value[${index}]`, attribute.value);
      });
      assets.forEach((file, index) => {
        if (typeof file.source === "string") {
          product?.assets?.forEach((asset) => {
            if (asset.path == String(file.source).replace("//", "")) {
              formData.append(`currentFile[]`, asset.id);
            }
          });
        } else {
          formData.append(`file[${index}]`, file.file);
        }
      });

      axios
        .post(`${process.env.backendUrl}/product/${id}/update`, formData)
        .then(() => (window.location = "/product"));
    }
  };

  return (
    <Section>
      {isLoading || !product ? (
        <Spinner />
      ) : (
        <>
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
            <Button
              onClick={() => addAttribute()}
              className="mb-4"
              color="success">
              Adicionar
            </Button>
            <PageSubtitle>Arquivos:</PageSubtitle>
            <div className={!isFilepondReady ? "hidden" : ""}>
              <FilePond
                allowMultiple
                files={assets}
                onupdatefiles={setAssets}
                imagePreviewHeight={150}
                oninit={() => setIsFilepondReady(true)}
                acceptedFileTypes={[
                  "image/png",
                  "image/jpeg",
                  "application/pdf",
                ]}
                labelIdle='Arraste e solte seus arquivos aqui ou <span class="filepond--label-action">Clique para buscar no dispositivo</span>'
              />
            </div>
            {!isFilepondReady && <Spinner />}
            <Button type="submit" className="my-4" color="gray">
              Salvar Alterações
            </Button>
          </form>
        </>
      )}
    </Section>
  );
}
