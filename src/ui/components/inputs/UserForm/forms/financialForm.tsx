import { FormValues } from "data/@types/forms/FormValue";
import { useFormContext } from "react-hook-form";
import TextField from "ui/components/inputs/TextField/TextField";
import { FinancialData } from "../UserForm.styled";
import { UserContext } from "data/contexts/UserContext";
import { useContext } from "react";

export const FinancialForm = () => {
  const { register } = useFormContext<FormValues>(),
    {
      userState: { user },
    } = useContext(UserContext);
  return (
    <FinancialData>
      <TextField
        label={"chave_pix"}
        defaultValue={user.chave_pix}
        {...register("usuario.chave_pix", { minLength: 5 })}
      />
    </FinancialData>
  );
};
