import { NewContactData } from "../UserForm.styled";
import TextField from "ui/components/inputs/TextField/TextField";
import { useFormContext } from "react-hook-form";
import { FormValues } from "data/@types/forms/FormValue";
import PasswordStrenght from "ui/components/feedback/PasswordStrenght/PasswordStrenght";

const NewContactForm = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<FormValues>();
  const newPassword = watch("usuario.password");
  return (
    <NewContactData>
      <TextField
        type={"email"}
        label={"E-mail"}
        style={{ gridArea: "email" }}
        {...register("usuario.email")}
        error={errors?.usuario?.email != undefined}
        helperText={errors?.usuario?.email?.message}
      />
      <TextField
        type={"password"}
        label={"Password"}
        style={{ gridArea: "senha" }}
        {...register("usuario.password")}
        error={errors?.usuario?.password != undefined}
        helperText={errors?.usuario?.password?.message}
      />
      <TextField
        type={"password"}
        label={"Confirmação da Senha"}
        style={{ gridArea: "confirmar-senha" }}
        {...register("usuario.password_confirmation")}
        error={errors?.usuario?.password_confirmation != undefined}
        helperText={errors?.usuario?.password_confirmation?.message}
      />
      <PasswordStrenght password={newPassword} />
    </NewContactData>
  );
};

export default NewContactForm;
