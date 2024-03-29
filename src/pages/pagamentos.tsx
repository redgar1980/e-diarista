import { Button, Container, Typography } from "@mui/material";
import usePagamentos from "data/hooks/pages/usePagamentos.page";
import { DiariaService } from "data/services/DiariaService";
import { PaymentService } from "data/services/PaymentService";
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

import { ButtonContainer } from "ui/partials/diarias/_minhas-diarias.styled";

const Pagamentos: React.FC<PropsWithChildren> = () => {
  const {
    isMobile,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    filteredData,
    filtro,
    setFiltro,
    alterarFiltro,
  } = usePagamentos();
  return (
    <Container sx={{ mb: 5, p: 0 }}>
      <PageTitle title="Minhas Diárias" />

      <ButtonContainer>
        <Button
          onClick={() => alterarFiltro("pago")}
          variant={filtro === "pago" ? "contained" : "outlined"}
        >
          Pago
        </Button>
        <Button
          onClick={() => alterarFiltro("aguardando")}
          variant={filtro === "aguardando" ? "contained" : "outlined"}
        >
          Aguardando transferência
        </Button>
      </ButtonContainer>

      {filteredData.length > 0 ? (
        isMobile ? (
          <>
            {filteredData.map((pagamento) => {
              return (
                <DataList
                  key={pagamento.id}
                  header={
                    <>
                      data:{" "}
                      {TextFormatService.reverseDate(
                        pagamento.created_at as string
                      )}
                    </>
                  }
                  body={
                    <>
                      Status:{" "}
                      {PaymentService.getStatus(pagamento.status!).label}
                      <br />
                      Valor diária:{" "}
                      {TextFormatService.currency(pagamento.valor)}
                      <br />
                      Valor depósito:{" "}
                      {TextFormatService.currency(pagamento.valor_deposito)}
                    </>
                  }
                />
              );
            })}
          </>
        ) : (
          <>
            <Table
              header={["Data", "Status", "Valor da Diária", "Valor Depósito"]}
              data={filteredData}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              rowElement={(pagamento, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <strong>
                      {TextFormatService.reverseDate(
                        pagamento.created_at as string
                      )}
                    </strong>
                  </TableCell>
                  <TableCell>
                    <Status
                      colors={PaymentService.getStatus(pagamento.status!).color}
                    >
                      {PaymentService.getStatus(pagamento.status!).label}
                      {pagamento.status}
                    </Status>
                  </TableCell>
                  <TableCell>
                    {TextFormatService.currency(pagamento.valor)}
                  </TableCell>
                  <TableCell>
                    {TextFormatService.currency(pagamento.valor_deposito)}
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

export default Pagamentos;
