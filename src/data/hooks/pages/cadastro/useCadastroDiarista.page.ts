import { useState } from "react";

export default function useCadastroDiarista() {
  const [step, setStep] = useState(1),
    breadCrumberItem = ["Identificação", "Cidades Atendidas"];

  return { step, setStep, breadCrumberItem };
}
