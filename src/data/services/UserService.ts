import { CadastroUserInterface } from "./../@types/FormInterface";
import { ApiLinksInterface } from "data/@types/ApiLinksInterface";
import { UserInterface, UserType } from "data/@types/UserInterface";
import { UseFormReturn } from "react-hook-form";
import { ApiService } from "./ApiService";
import { TextFormatService } from "./TextFormatService";
import { ObjectService } from "./ObjectService";
import axios from "axios";

export const UserService = {
  async cadastrar(
    user: UserInterface,
    userType: UserType,
    link: ApiLinksInterface
  ): Promise<UserInterface | undefined> {
    ApiService.defaults.headers.common.Authorization = "";

    const cpf = TextFormatService.getNumbersFromText(user.cpf),
      telefone = TextFormatService.getNumbersFromText(user.telefone),
      nascimento = TextFormatService.dataToString(user.nascimento as Date),
      userData = ObjectService.jsonToFormData({
        ...user,
        tipo_usuario: userType,
        cpf,
        telefone,
        nascimento,
      });

    const response = await ApiService.request<UserInterface>({
      url: link.uri,
      method: link.type,
      data: userData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  handleNewUserError(
    error: unknown,
    form: UseFormReturn<CadastroUserInterface>
  ) {
    if (axios.isAxiosError(error)) {
      const errorList = error.response?.data as UserInterface | undefined;

      if (errorList) {
        if (errorList.cpf) {
          form.setError("usuario.cpf", {
            type: "cadastrado",
            message: "CPF já cadastrado",
          });
        }
        if (errorList.cpf) {
          form.setError("usuario.email", {
            type: "cadastrado",
            message: "E-mail já cadastrado",
          });
        }
      }
    }
  },
};
