export interface UserShortInformationInterface {
  nomeCompleto: string;
  fotoUsuario: string;
  reputacao?: number;
  cidade: string;
}

export interface BuscarCepResponse {
  diaristas: UserShortInformationInterface[];
  quantidade_diaristas: number;
}
