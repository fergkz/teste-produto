"use client";

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
          <ul className="pl-4 list-disc">
            {product.attributes?.length > 0 ? (
              product.attributes.map((attribute, index) => (
                <li key={index}>
                  <b>{attribute.title}</b>: {attribute.value}
                </li>
              ))
            ) : (
              <li className="font-medium">Nenhum</li>
            )}
          </ul>
        </>
      )}
    </Section>
  );
}
