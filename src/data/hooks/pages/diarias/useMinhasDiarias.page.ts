import { DiariaInterface } from "data/@types/DiariaInterface";
import { DiariaContext } from "data/contexts/DiariaContext";
import useIsMobile from "data/hooks/useIsMobile";
import usePagination from "data/hooks/usePagination.hook";
import { linksResolver } from "data/services/ApiService";
import { useContext, useState } from "react";

export default function useMinhasDiarias() {
  const isMobile = useIsMobile(),
    { diariaState: diarias } = useContext(DiariaContext),
    filteredData = diarias,
    { currentPage, setCurrentPage, totalPages, itemsPerPage } = usePagination(
      diarias.diarias,
      5
    ),
    [diariaConfirmar, setDiariaConfirmar] = useState<DiariaInterface>();

  function podeVisualizar(diaria: DiariaInterface): boolean {
    return linksResolver(diaria.links, "self") !== undefined;
  }

  function podeCancelar(diaria: DiariaInterface): boolean {
    return linksResolver(diaria.links, "cancelar_diaria") !== undefined;
  }

  function podeConfirmar(diaria: DiariaInterface): boolean {
    return linksResolver(diaria.links, "confirmar_diarista") !== undefined;
  }

  function podeAvaliar(diaria: DiariaInterface): boolean {
    return linksResolver(diaria.links, "avaliar_diaria") !== undefined;
  }

  return {
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
    diariaConfirmar,
    setDiariaConfirmar,
  };
}
