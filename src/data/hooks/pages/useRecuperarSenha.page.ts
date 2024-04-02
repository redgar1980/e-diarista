import { ExternalServiceContext } from "data/contexts/ExternalServiceContext";
import { ApiServiceHateoas } from "data/services/ApiService";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export function useRecuperarSenha() {
  const router = useRouter(),
    [email, setEmail] = useState(""),
    { externalServicesState } = useContext(ExternalServiceContext),
    [mensagemSnack, setMensagemSnack] = useState("");

  async function pedirToken() {
    if (email.length > 8) {
      ApiServiceHateoas(
        externalServicesState.externaService,
        "solicitar_alteracao_senha",
        async (request) => {
          try {
            await request({
              data: {
                email,
              },
            });
            setMensagemSnack(
              "Uma mensagem foi enviada ao seu E-mail para a recuperação da senha"
            );
          } catch (error) {}
        }
      );
    } else {
      setMensagemSnack("Digite um E-mail válido");
    }
  }

  return {
    router,
    email,
    setEmail,
  };
}
