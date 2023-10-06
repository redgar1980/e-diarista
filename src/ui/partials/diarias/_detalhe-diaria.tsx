import { Box, CircularProgress, Container } from "@mui/material";
import useDetalhesDiaria from "data/hooks/pages/diarias/useDetalhesDiaria";
import React, { PropsWithChildren } from "react";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";

import { CardsContainer, JobDetails, JobTitle } from "./_detalhe-diaria.styled";
import Status from "ui/components/data-display/Status/Status";
import { DiariaService } from "data/services/DiariaService";
import { TextFormatService } from "data/services/TextFormatService";
import { DateService } from "data/services/DateService";

const DetalheDiaria: React.FC<PropsWithChildren<{ id: string }>> = ({ id }) => {
  const { diarista, cliente, diaria } = useDetalhesDiaria(id);

  if (!diaria?.id) {
    return (
      <Container sx={{ textAlign: "center", my: 10 }}>
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Container>
      <PageTitle title={`Detalhes da diária: #${id}`} />
      <CardsContainer>
        <JobDetails>
          <JobTitle>Detalhes da diária</JobTitle>
          <Box sx={{ mb: 2 }}>
            Status:{" "}
            <Status colors={DiariaService.getStatus(diaria.status!).color}>
              {DiariaService.getStatus(diaria.status!).label}
            </Status>
          </Box>
          <div>
            Data:{" "}
            <strong>
              {TextFormatService.reverseDate(diaria.data_atendimento as string)}
            </strong>
            <br />
            Horário:{" "}
            <strong>
              {DateService.getTimeFromDate(diaria.data_atendimento as string)}
            </strong>
            <br />
            Endereço: <strong>{TextFormatService.getAddress(diaria)}</strong>
          </div>
        </JobDetails>
      </CardsContainer>
    </Container>
  );
};

export default DetalheDiaria;
