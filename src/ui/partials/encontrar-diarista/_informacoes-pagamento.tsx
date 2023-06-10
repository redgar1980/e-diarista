import { Button, Container, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { PaymentForm } from "ui/components/inputs/UserForm/UserForm";

// import { Component } from './_informacoes-pagamento.styled';

const InformacoesPagamento: React.FC<PropsWithChildren> = () => {
  return (
    <div>
      <Typography sx={{ fontWeight: "bold", pb: 2 }}>
        Informações de pagamento
      </Typography>
      <PaymentForm />
      <Container sx={{ textAlign: "center" }}>
        <Button variant="contained" color="secondary" type="submit">
          Fazer Pagamento
        </Button>
      </Container>
    </div>
  );
};

export default InformacoesPagamento;
