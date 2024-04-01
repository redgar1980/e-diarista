import React from "react";
import { GetStaticProps } from "next";
import { useAlterarDados } from "data/hooks/pages/useAlterarDados.page";
import { FormProvider } from "react-hook-form";
import {
  AddressForm,
  FinancialForm,
  UserDataForm,
  UserFormContainer,
} from "ui/components/inputs/UserForm/UserForm";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import { Box, Button, Paper, Snackbar, Typography } from "@mui/material";
import { FormContainer, UserPicture } from "@styles/pages/alterar-dados.styled";
import { UserType } from "data/@types/UserInterface";
import ContactForm from "ui/components/inputs/UserForm/forms/ContactForm";
import { CitiesForm } from "ui/components/inputs/UserForm/forms/CitiesForm";

// import { Component } from '@styles/pages/alterar-dados.styled';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "AlterarDados",
    },
  };
};

const AlterarDados: React.FC = () => {
  const {
    formMethods,
    dadosUsuario,
    picture,
    onPictureChange,
    onSubmit,
    dadosEndereco,
    snackMessage,
    setSnackMessage,
  } = useAlterarDados();
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <UserFormContainer>
          <PageTitle title="Alterar dados cadastrais" />
          <Paper sx={{ position: "relative", mb: 3, mt: 15 }}>
            <UserPicture>
              {picture && (
                <img src={picture} alt={dadosUsuario.nome_completo} />
              )}
              <input
                type="file"
                accept=".jpeg, .jpg, .png"
                onChange={onPictureChange}
              />
              <i className="twf-camera" />
            </UserPicture>
            <Typography sx={{ pt: 14, pb: 2 }} align={"center"}>
              Dados pessoais
            </Typography>
            <FormContainer>
              <UserDataForm />
            </FormContainer>
          </Paper>

          {dadosUsuario.tipo_usuario === UserType.Diarista && (
            <Paper>
              <Typography sx={{ pt: 14, pb: 2 }} align={"center"}>
                Financeiro
              </Typography>
              <FormContainer>
                <FinancialForm />
              </FormContainer>
            </Paper>
          )}

          <Paper>
            <Typography sx={{ pt: 14, pb: 2 }} align={"center"}>
              Dados de acesso
            </Typography>
            <FormContainer>
              <ContactForm />
            </FormContainer>
          </Paper>

          {dadosUsuario.tipo_usuario === UserType.Diarista && (
            <>
              <Paper>
                <Typography sx={{ pt: 14, pb: 2 }} align={"center"}>
                  Endereço
                </Typography>
                <FormContainer>
                  <AddressForm />
                </FormContainer>
              </Paper>
              <Paper>
                <Typography sx={{ pt: 14, pb: 2 }} align={"center"}>
                  Cidades
                </Typography>
                <FormContainer>
                  <CitiesForm estado={dadosEndereco.estado} />
                </FormContainer>
              </Paper>
            </>
          )}
          <Box sx={{ mt: 2, mb: 8, textAlign: "center" }}>
            <Button
              variant={"contained"}
              color={"secondary"}
              size={"large"}
              type={"submit"}
            >
              Salvar
            </Button>
          </Box>
        </UserFormContainer>
      </form>
      <Snackbar
        open={snackMessage.length > 0}
        message={snackMessage}
        autoHideDuration={4000}
        onClose={() => setSnackMessage("")}
      />
    </FormProvider>
  );
};

export default AlterarDados;
