"use client";

import AssetPreview from "@/components/AssetPreview";
import Grid from "@/components/Grid";
import PageSubtitle from "@/components/PageSubtitle";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ProductShow({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [product]);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Section>
      {isLoading || !product ? (
        <Spinner />
      ) : (
        <>
          <PageTitle>Visualizar Produto: {product.id}</PageTitle>
          <PageSubtitle>Atributos:</PageSubtitle>
          {product.attributes?.length > 0 ? (
            <ul className="pb-4 pl-4 list-disc">
              {product.attributes.map((attribute, index) => (
                <li key={index}>
                  <b>{attribute.title}</b>: {attribute.value}
                </li>
              ))}
            </ul>
          ) : (
            <b className="block pb-4">Nenhum</b>
          )}
          <PageSubtitle>Arquivos:</PageSubtitle>
          <Grid gridCols="grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {product.assets?.length > 0 ? (
              product.assets.map((asset, index) => (
                <AssetPreview key={index} asset={asset} />
              ))
            ) : (
              <b className="block">Nenhum</b>
            )}
          </Grid>
        </>
      )}
    </Section>
  );
}
