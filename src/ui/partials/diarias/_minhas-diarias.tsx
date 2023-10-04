import { Button, Container, Typography } from "@mui/material";
import useMinhasDiarias from "data/hooks/pages/diarias/useMinhasDiarias.page";
import { DiariaService } from "data/services/DiariaService";
import { TextFormatService } from "data/services/TextFormatService";
import React, { PropsWithChildren } from "react";
import DataList from "ui/components/data-display/DataList/DataList";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import Status from "ui/components/data-display/Status/Status";
import Table, {
  TableCell,
  TablePagination,
  TableRow,
} from "ui/components/data-display/Table/Table";
import Link from "ui/components/navigation/Link/Link";

// import { Component } from './_minhas-diarias.styled';

const MinhasDiarias: React.FC<PropsWithChildren> = () => {
  const {
    isMobile,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    filteredData,
    podeVisualizar,
    podeCancelar,
    podeConfirmar,
    podeAvaliar,
  } = useMinhasDiarias();
  return (
    <Container sx={{ mb: 5, p: 0 }}>
      <PageTitle title="Minhas Diárias" />
      {filteredData.diarias.length > 0 ? (
        isMobile ? (
          <>
            {filteredData.diarias.map((item) => {
              return (
                <DataList
                  key={item.id}
                  header={
                    <>
                      data:{" "}
                      {TextFormatService.reverseDate(
                        item.data_atendimento as string
                      )}
                      <br />
                      {item.nome_servico}
                    </>
                  }
                  body={
                    <>
                      Status: {DiariaService.getStatus(item.status!).label}
                      <br />
                      Valor: {TextFormatService.currency(item.preco)}
                    </>
                  }
                  actions={
                    <>
                      {podeVisualizar(item) && (
                        <Button
                          component={Link}
                          href={`?id=${item.id}`}
                          color={"inherit"}
                          variant={"outlined"}
                        >
                          Detalhes
                        </Button>
                      )}
                      {podeCancelar(item) && (
                        <Button color={"error"} variant={"contained"}>
                          Cancelado
                        </Button>
                      )}
                      {podeConfirmar(item) && (
                        <Button color={"success"} variant={"contained"}>
                          Confirmar Presença
                        </Button>
                      )}
                      {podeAvaliar(item) && (
                        <Button color={"success"} variant={"contained"}>
                          Avaliar
                        </Button>
                      )}
                    </>
                  }
                />
              );
            })}
          </>
        ) : (
          <>
            <Table
              header={["Data", "Status", "Tipo de Serviço", "Valor", "", ""]}
              data={filteredData.diarias}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              rowElement={(item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <strong>
                      {TextFormatService.reverseDate(
                        item.data_atendimento as string
                      )}
                    </strong>
                  </TableCell>
                  <TableCell>
                    <Status
                      colors={DiariaService.getStatus(item.status!).color}
                    >
                      {DiariaService.getStatus(item.status!).label}
                      {item.status}
                    </Status>
                  </TableCell>
                  <TableCell>{item.nome_servico}</TableCell>
                  <TableCell>
                    {TextFormatService.currency(item.preco)}
                  </TableCell>
                  <TableCell>
                    {podeVisualizar(item) && (
                      <Link href={`?id=${item.id}`}>Detalhes</Link>
                    )}
                  </TableCell>
                  <TableCell>
                    {podeCancelar(item) && (
                      <Button color="error">Cancelar</Button>
                    )}
                    {podeConfirmar(item) && (
                      <Button color={"success"}>Confirmar Presença</Button>
                    )}
                    {podeAvaliar(item) && (
                      <Button color={"success"}>Avaliar</Button>
                    )}
                  </TableCell>
                </TableRow>
              )}
            />
            <TablePagination
              count={totalPages}
              page={currentPage}
              onChange={(_evt, nextPage) => setCurrentPage(nextPage)}
            />
          </>
        )
      ) : (
        <Typography align="center">Nenhuma diária ainda</Typography>
      )}
    </Container>
  );
};

export default MinhasDiarias;
