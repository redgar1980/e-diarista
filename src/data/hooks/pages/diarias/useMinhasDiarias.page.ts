import { DiariaInterface } from "data/@types/DiariaInterface";
import { DiariaContext } from "data/contexts/DiariaContext";
import useIsMobile from "data/hooks/useIsMobile";
import usePagination from "data/hooks/usePagination.hook";
import { ApiServiceHateoas, linksResolver } from "data/services/ApiService";
import { useContext, useState } from "react";
import { mutate } from "swr";

export default function useMinhasDiarias() {
  const isMobile = useIsMobile(),
    { diariaState: diarias } = useContext(DiariaContext),
    filteredData = diarias,
    { currentPage, setCurrentPage, totalPages, itemsPerPage } = usePagination(
      diarias.diarias,
      5
    ),
    [diariaConfirmar, setDiariaConfirmar] = useState<DiariaInterface>(),
    [diariaAvaliar, setDiariaAvaliar] = useState<DiariaInterface>(),
    [diariaCancelar, setDiariaCancelar] = useState<DiariaInterface>();

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

  async function confirmarDiaria(diaria: DiariaInterface) {
    ApiServiceHateoas(diaria.links, "confirmar_diarista", async (request) => {
      try {
        await request();
        setDiariaConfirmar(undefined);
        atualizarDiarias();
      } catch (error) {}
    });
  }

  async function avaliarDiaria(
    diaria: DiariaInterface,
    avaliacao: { descricao: string; nota: number }
  ) {
    ApiServiceHateoas(diaria.links, "avaliar_diaria", async (request) => {
      try {
        await request({
          data: avaliacao,
        });
        setDiariaAvaliar(undefined);
        atualizarDiarias();
      } catch (error) {}
    });
  }

  function atualizarDiarias() {
    mutate("lista_diarias");
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
    confirmarDiaria,
    diariaAvaliar,
    setDiariaAvaliar,
    avaliarDiaria,
    diariaCancelar,
    setDiariaCancelar,
  };
}
