import React from "react";
import { GetStaticProps } from "next";
import { useRecuperarSenha } from "data/hooks/pages/useRecuperarSenha.page";
import {
  FormFieldsContainer,
  LoginButton,
} from "@styles/pages/recuperar-senha.styled";
import TextField from "ui/components/inputs/TextField/TextField";
import { Container } from "@mui/material";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import PasswordStrenght from "ui/components/feedback/PasswordStrenght/PasswordStrenght";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "RecuperarSenha",
    },
  };
};

const RecuperarSenha: React.FC = () => {
  const { router } = useRecuperarSenha();
  return (
    <Container>
      <PageTitle title={"Recuperação de Senha"} />
      {router.query.token ? (
        <FormFieldsContainer>
          <TextField label={"Digite seu E-mail"} type={"email"} fullWidth />
          <TextField
            label={"Digite a nova senha"}
            type={"password"}
            fullWidth
          />
          <TextField
            label={"Confirme a nova senha"}
            type={"password"}
            fullWidth
          />
          <PasswordStrenght password="" />
          <LoginButton size={"large"} variant={"contained"} color={"secondary"}>
            Redefinir Senha
          </LoginButton>
        </FormFieldsContainer>
      ) : (
        <FormFieldsContainer>
          <TextField label={"Digite seu E-mail"} type={"email"} />
          <TextField label={"Digite seu Token"} type={"text"} />
          <LoginButton size={"large"} variant={"contained"} color={"secondary"}>
            Enviar E-mail
          </LoginButton>
        </FormFieldsContainer>
      )}
    </Container>
  );
};

export default RecuperarSenha;
