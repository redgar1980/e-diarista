import { FormValues } from "data/@types/forms/FormValue";
import { useFormContext } from "react-hook-form";
import TextField from "ui/components/inputs/TextField/TextField";
import { FinancialData } from "../UserForm.styled";

export const FinancialForm = () => {
  const { register } = useFormContext<FormValues>();
  return (
    <FinancialData>
      <TextField
        label={"chave_pix"}
        defaultValue={""}
        {...register("usuario.chave_pix", { minLength: 5 })}
      />
    </FinancialData>
  );
};
