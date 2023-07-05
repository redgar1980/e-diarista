import { FormSchemaService } from "./../../services/FormSchemaService";
import {
  NovaDiariaFormDataInterface,
  CadastroClienteFormDataInterface,
  LoginFormDataInterface,
  CredenciaisInterface,
  PagamentoFormDataInterface,
} from "data/@types/FormInterface";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServicoInterface } from "data/@types/ServicoInterface";
import userSwr from "swr";
import useApi from "../useApi.hook";
import { DiariaInterface } from "data/@types/DiariaInterface";
import { ValidationService } from "data/services/ValidationService";
import { DateService } from "data/services/DateService";
import { houseParts } from "@partials/encontrar-diarista/_detalhe-servico";

export default function useContratacao() {
  const [step, setStep] = useState(1),
    [hasLogin, setHasLogin] = useState(false),
    [loginErro, setLoginErro] = useState(""),
    breadcrumbItems = ["Detalhes da diária", "Identificação", "Pagamento"],
    serviceForm = useForm<NovaDiariaFormDataInterface>({
      resolver: yupResolver(
        FormSchemaService.address().concat(FormSchemaService.detalheServico())
      ),
    }),
    clientForm = useForm<CadastroClienteFormDataInterface>({
      resolver: yupResolver(
        FormSchemaService.userData().concat(FormSchemaService.newContact())
      ),
    }),
    loginForm = useForm<LoginFormDataInterface<CredenciaisInterface>>({
      resolver: yupResolver(FormSchemaService.login()),
    }),
    paymentForm = useForm<PagamentoFormDataInterface>({
      resolver: yupResolver(FormSchemaService.payment()),
    }),
    servicos = useApi<ServicoInterface[]>("/api/servicos").data,
    dadosFaxina = serviceForm.watch("faxina"),
    tipoLimpeza = useMemo<ServicoInterface>(() => {
      if (servicos && dadosFaxina?.servico) {
        const selectedServico = servicos.find(
          (servico) => servico.id === dadosFaxina.servico
        );

        if (selectedServico) {
          return selectedServico;
        }
      }
      return {} as ServicoInterface;
    }, [servicos, dadosFaxina?.servico]),
    { totalTime, tamanhoCasa, totalPrice } = useMemo(() => {
      return {
        totalTime: calcularTempoServico(dadosFaxina, tipoLimpeza),
        tamanhoCasa: listarComodos(dadosFaxina),
        totalPrice: calcularPreco(dadosFaxina, tipoLimpeza),
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      tipoLimpeza,
      dadosFaxina,
      dadosFaxina?.quantidade_banheiros,
      dadosFaxina?.quantidade_cozinhas,
      dadosFaxina?.quantidade_outros,
      dadosFaxina?.quantidade_quartos,
      dadosFaxina?.quantidade_quintais,
      dadosFaxina?.quantidade_salas,
    ]);

  useEffect(() => {
    if (
      dadosFaxina &&
      ValidationService.hora(dadosFaxina.hora_inicio) &&
      totalTime >= 0
    ) {
      serviceForm.setValue("faxina.hora_inicio", dadosFaxina?.hora_inicio, {
        shouldValidate: true,
      });
      serviceForm.setValue(
        "faxina.data_atendimento",
        dadosFaxina?.data_atendimento,
        {
          shouldValidate: true,
        }
      );
      serviceForm.setValue(
        "faxina.hora_termino",
        DateService.addHours(dadosFaxina?.hora_inicio as string, totalTime),
        {
          shouldValidate: true,
        }
      );
    } else {
      serviceForm.setValue("faxina.hora_termino", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    totalTime,
    dadosFaxina?.data_atendimento,
    dadosFaxina?.hora_inicio,
    dadosFaxina?.hora_termino,
  ]);

  function onServiceFormSubmit(data: NovaDiariaFormDataInterface) {
    console.log(data);
  }

  function onClientFormSubmit(data: CadastroClienteFormDataInterface) {
    console.log(data);
  }

  function onLoginFormSubmit(
    data: LoginFormDataInterface<CredenciaisInterface>
  ) {
    console.log(data);
  }

  function onPaymentFormSubmit(data: PagamentoFormDataInterface) {
    console.log(data);
  }

  function calcularTempoServico(
    dadosFaxina: DiariaInterface,
    tipoLimpeza: ServicoInterface
  ): number {
    let total = 0;
    if (dadosFaxina && tipoLimpeza) {
      total += tipoLimpeza.horas_banheiro * dadosFaxina.quantidade_banheiros;
      total += tipoLimpeza.horas_cozinha * dadosFaxina.quantidade_cozinhas;
      total += tipoLimpeza.horas_outros * dadosFaxina.quantidade_outros;
      total += tipoLimpeza.horas_quarto * dadosFaxina.quantidade_quartos;
      total += tipoLimpeza.horas_quintal * dadosFaxina.quantidade_quintais;
      total += tipoLimpeza.horas_sala * dadosFaxina.quantidade_salas;
    }
    return total;
  }

  function calcularPreco(
    dadosFaxina: DiariaInterface,
    tipoLimpeza: ServicoInterface
  ): number {
    let total = 0;
    if (dadosFaxina && tipoLimpeza) {
      total += tipoLimpeza.valor_banheiro * dadosFaxina.quantidade_banheiros;
      total += tipoLimpeza.valor_cozinha * dadosFaxina.quantidade_cozinhas;
      total += tipoLimpeza.valor_outros * dadosFaxina.quantidade_outros;
      total += tipoLimpeza.valor_quarto * dadosFaxina.quantidade_quartos;
      total += tipoLimpeza.valor_quintal * dadosFaxina.quantidade_quintais;
      total += tipoLimpeza.valor_sala * dadosFaxina.quantidade_salas;
    }
    return Math.max(total, tipoLimpeza.valor_minimo);
  }

  function listarComodos(dadosFaxina: DiariaInterface): string[] {
    const comodos: string[] = [];

    if (dadosFaxina) {
      houseParts.forEach((housePart) => {
        const total = dadosFaxina[
          housePart.nome as keyof DiariaInterface
        ] as number;
        if (total > 0) {
          const nome = total > 1 ? housePart.plural : housePart.singular;
          comodos.push(`${total} ${nome}`);
        }
      });
    }

    return comodos;
  }

  return {
    step,
    breadcrumbItems,
    serviceForm,
    onServiceFormSubmit,
    servicos,
    hasLogin,
    setHasLogin,
    clientForm,
    onClientFormSubmit,
    setStep,
    loginForm,
    onLoginFormSubmit,
    loginErro,
    paymentForm,
    onPaymentFormSubmit,
    tamanhoCasa,
    tipoLimpeza,
    totalPrice,
  };
}
