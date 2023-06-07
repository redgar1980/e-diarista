import { FormSchemaService } from "./../../services/FormSchemaService";
import { NovaDiariaFormDataInterface } from "data/@types/FormInterface";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useContratacao() {
  const [step, setStep] = useState(1),
    breadcrumbItems = ["Detalhes da diária", "Identificação", "Pagamento"],
    serviceForm = useForm<NovaDiariaFormDataInterface>({
      resolver: yupResolver(
        FormSchemaService.address().concat(FormSchemaService.detalheServico())
      ),
    });

  function onServiceFormSubmit(data: NovaDiariaFormDataInterface) {
    console.log(data);
  }

  return { step, breadcrumbItems, serviceForm, onServiceFormSubmit };
}
