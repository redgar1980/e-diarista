
import { useContext } from "react";
import useApiHateoas from "../useApi.hook";
import { UserContext } from "data/contexts/UserContext";
import { Oportunidade } from "data/@types/OportunidadeInterface";
import useIsMobile from "../useIsMobile";

export default function useOportunidades() {
  const {
    userState: { user }
  } = useContext(UserContext),
  oportunidades = useApiHateoas<Oportunidade[]>(user.links, "lista_oportunidades").data,
  isMobile = useIsMobile();

  return { oportunidades, isMobile };
}