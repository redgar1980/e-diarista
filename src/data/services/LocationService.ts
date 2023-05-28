import {
  CepResponse,
  CidadeInterface,
  EstadoInterface,
} from "data/@types/EnderecoInteface";
import { ApiService } from "./ApiService";

export const LocationService = {
  estados(): EstadoInterface[] {
    return [
      { nome: "Acre", sigla: "AC" },
      { nome: "Santa Catarina", sigla: "SC" },
      { nome: "Sergipe", sigla: "SE" },
      { nome: "São Paulo", sigla: "SP" },
      { nome: "Tocantins", sigla: "TO" },
    ];
  },
  async cidades(estado: string): Promise<CidadeInterface[] | undefined> {
    try {
      const response = await ApiService.request<{ nome: string; id: number }[]>(
        {
          baseURL:
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados/",
          url: `${estado}/municipios`,
        }
      );

      return response.data.map((cidade) => ({
        cidade: cidade.nome,
        codigo_ibge: cidade.id,
      }));
    } catch (error) {}
  },
  async cep(cep: string): Promise<CepResponse | undefined> {
    try {
      const response = await ApiService.request<CepResponse>({
        url: "api/enderecos?cep=" + cep.replace(/\D/g, ""),
      });

      return response.data;
    } catch (error) {}
  },
};
