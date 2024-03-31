import { yupResolver } from "@hookform/resolvers/yup";
import { UserType } from "data/@types/UserInterface";
import { UserContext } from "data/contexts/UserContext";
import { FormSchemaService } from "data/services/FormSchemaService";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export function useAlterarDados() {
  const formMethods = useForm({
      resolver: getResolver(),
    }),
    {
      userState: { user },
      userDispatch,
    } = useContext(UserContext);

  function getResolver() {
    let resolver = FormSchemaService.userData().concat(
      FormSchemaService.contact()
    );

    if (user.tipo_usuario === UserType.Diarista) {
      resolver = resolver.concat(FormSchemaService.address());
    }
    return yupResolver(resolver);
  }
}
