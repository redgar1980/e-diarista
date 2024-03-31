import { ApiLinksInterface } from "data/@types/ApiLinksInterface";
import {
  CidadeInterface,
  EnderecoInterface,
} from "data/@types/EnderecoInteface";
import { UserInterface, UserType } from "data/@types/UserInterface";
import { ApiService, ApiServiceHateoas } from "data/services/ApiService";
import { LoginService } from "data/services/LoginService";
import produce from "immer";
import React, { useReducer, useEffect } from "react";

export const initialState = {
  user: {
    nome_completo: "",
    nascimento: "",
    cpf: "",
    email: "",
    foto_usuario: "",
    telefone: "",
    reputacao: 0,
    chave_pix: "",
    tipo_usuario: UserType.Cliente,
  } as UserInterface,
  addressList: [] as CidadeInterface[],
  userAddress: {
    logradouro: "",
    bairro: "",
    complemento: "",
    cep: "",
    cidade: "",
    estado: "",
    numero: "",
  } as EnderecoInterface,
  isLogging: false,
};

export type InitialStateType = typeof initialState;

type UserAction =
  | "SET_USER"
  | "SET_LOGGING"
  | "SET_ADDRESS_LIST"
  | "SET_USER_ADDRESS";

export type UserActionType = {
  type: UserAction;
  payload?: unknown;
};

const reducer = (
  state: InitialStateType,
  action: UserActionType
): InitialStateType => {
  const nextState = produce(state, (draftState) => {
    switch (action.type) {
      case "SET_USER":
        draftState.user = action.payload as UserInterface;
        draftState.isLogging = false;
        break;
      case "SET_ADDRESS_LIST":
        draftState.addressList = action.payload as CidadeInterface[];
        break;
      case "SET_USER_ADDRESS":
        draftState.userAddress = action.payload as EnderecoInterface;
        break;
      case "SET_LOGGING":
        draftState.isLogging = action.payload as boolean;
        break;
    }
  });
  return nextState;
};
export interface UserReducerInterface {
  userState: InitialStateType;
  userDispatch: React.Dispatch<UserActionType>;
}

export function useUserReducer(): UserReducerInterface {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getUser();
  }, [state.user.id]);

  async function getUser() {
    try {
      dispatch({ type: "SET_LOGGING", payload: true });
      const user = await LoginService.getUser();
      if (user) {
        dispatch({ type: "SET_USER", payload: user });
        if (user.tipo_usuario === UserType.Diarista) {
          getAddress(user);
          getAddressList(user);
        }
      }
    } catch (error) {
    } finally {
      dispatch({ type: "SET_LOGGING", payload: false });
    }
  }

  async function getAddress(user: UserInterface) {
    ApiServiceHateoas(user.links, "listar_endereco", async (request) => {
      try {
        const response = await request();
        dispatch({ type: "SET_USER_ADDRESS", payload: response.data });
      } catch (error) {}
    });
  }

  async function getAddressList(user: UserInterface) {
    ApiServiceHateoas(user.links, "cidades_atendidaas", async (request) => {
      try {
        const response = await request();
        dispatch({ type: "SET_ADDRESS_LIST", payload: response.data });
      } catch (error) {}
    });
  }

  return {
    userState: state,
    userDispatch: dispatch,
  };
}
