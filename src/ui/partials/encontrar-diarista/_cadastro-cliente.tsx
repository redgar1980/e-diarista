import { Button, Container, Divider, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";
import {
  PictureForm,
  UserDataForm,
} from "ui/components/inputs/UserForm/UserForm";
import NewContactForm from "ui/components/inputs/UserForm/forms/NewContactForm";

// import { Component } from './_cadastro-cliente.styled';

const CadastroCliente: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div>
      <Typography sx={{ fontWeight: "bold", pb: 2 }}>Dados pessoais</Typography>
      <UserDataForm />
      <Divider sx={{ mb: 5 }} />

      <Typography sx={{ fontWeight: "bold", pb: 2 }}>
        Hora da self! Envie uma self segurando o documento
      </Typography>
      <PictureForm />
      <Typography sx={{ pb: 5, pt: 1 }} variant={"body2"}>
        Essa foto não será vista por ninguém
      </Typography>
      <Divider sx={{ mb: 5 }} />

      <Typography sx={{ fontWeight: "bold", pb: 2 }}>
        Dados de acesso
      </Typography>
      <NewContactForm />
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={onBack}
        >
          Voltar para detalhes da diária
        </Button>

        <Button variant="contained" color="secondary" type="submit">
          Ir para pagamento
        </Button>
      </Container>
    </div>
  );
};

export default CadastroCliente;
