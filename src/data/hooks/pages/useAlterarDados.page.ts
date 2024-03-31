import { yupResolver } from "@hookform/resolvers/yup";
import { EnderecoInterface } from "data/@types/EnderecoInteface";
import { CadastroDiaristaFormDataInterface } from "data/@types/FormInterface";
import { UserType } from "data/@types/UserInterface";
import { UserContext } from "data/contexts/UserContext";
import { ApiServiceHateoas } from "data/services/ApiService";
import { FormSchemaService } from "data/services/FormSchemaService";
import { ObjectService } from "data/services/ObjectService";
import { TextFormatService } from "data/services/TextFormatService";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useAlterarDados() {
  const {
      userState: { user },
      userDispatch,
    } = useContext(UserContext),
    dadosUsuario = user,
    formMethods = useForm<CadastroDiaristaFormDataInterface>({
      resolver: getResolver(),
    }),
    [picture, setPicture] = useState<string>(),
    [pictureFile, setPictureFile] = useState<File>();

  useEffect(() => {
    setPicture(user.foto_usuario);
  }, [user]);

  function onPictureChange({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) {
    if (files !== null && files.length) {
      const file = files[0];
      setPicture(URL.createObjectURL(file));
    }
    //const target = event.target;
  }

  function getResolver() {
    let resolver = FormSchemaService.userData().concat(
      FormSchemaService.contact()
    );

    if (user.tipo_usuario === UserType.Diarista) {
      resolver = resolver.concat(FormSchemaService.address());
    }
    return yupResolver(resolver);
  }

  async function updatePicture() {
    ApiServiceHateoas(user.links, "alterar_foto_usuario", async (request) => {
      if (pictureFile) {
        try {
          const userData = ObjectService.jsonToFormData({
            foto_usuario: pictureFile,
          });
          await request({
            data: userData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (error) {}
      }
    });
  }

  async function updateUserAddress(data: CadastroDiaristaFormDataInterface) {
    ApiServiceHateoas(user.links, "editar_endereco", async (request) => {
      const endereco = {
        ...data.endereco,
        cep: TextFormatService.getNumbersFromText(data.endereco?.cep),
      };

      try {
        await request<EnderecoInterface>({
          data: endereco,
        });
        userDispatch({ type: "SET_USER_ADDRESS", payload: endereco });
      } catch (error) {}
    });
  }

  return { formMethods, dadosUsuario, picture, onPictureChange };
}
