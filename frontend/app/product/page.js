"use client";

import Section from "@/components/Section";
import axios from "axios";
import { Button, Pagination, Spinner, Table } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await axios
        .get(`${process.env.backendUrl}/product?page=${currentPage}`)
        .then((response) => response.data)
        .then((data) => setDataList(data));
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [dataList]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <Section>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table striped>
              <Table.Head>
                <Table.HeadCell width="66%">ID do Produto</Table.HeadCell>
                <Table.HeadCell>Ações</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {dataList?.data?.length > 0 ? (
                  dataList.data.map((value, index) => (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {value.id}
                      </Table.Cell>
                      <Table.Cell>
                        <Button.Group>
                          <Button
                            as={Link}
                            href={`/product/${value.id}/show`}
                            color="gray">
                            Visualizar
                          </Button>
                          <Button
                            as={Link}
                            href={`/product/${value.id}/edit`}
                            color="gray">
                            Editar
                          </Button>
                          <Button
                            as={Link}
                            href={`/product/${value.id}/delete`}
                            color="gray">
                            Deletar
                          </Button>
                        </Button.Group>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell
                      colSpan={2}
                      className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Nenhum produto encontrado
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
          {dataList?.totalPages > 1 && (
            <Pagination
              layout="pagination"
              currentPage={currentPage}
              totalPages={dataList.totalPages}
              onPageChange={onPageChange}
              previousLabel=""
              nextLabel=""
              showIcons
            />
          )}
        </>
      )}
    </Section>
  );
}
