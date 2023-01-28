import { ApiService } from './../../services/ApiService';
import { BuscarCepResponse, UserShortInformationInterface } from 'data/@types/UserInterface';
import { ValidationService } from 'data/services/ValidationService';
import { useMemo, useState } from 'react';

export default function useVerificarProfissionais() {
  const [cep, setCep] = useState(''),
    [error, setError] = useState(''),
    [buscaFeita, setBuscaFeita] = useState(false),
    [carregando, setCarregando] = useState(false),
    [diaristas, setDiaristas] = useState<UserShortInformationInterface[]>([]),
    [diaristasRestantes, setDiaristasRestantes] = useState(0),
    cepValido = useMemo(() => {
      return ValidationService.cep(cep);
    }, [cep]);

  async function buscarProfissionais(cep: string) {
    setBuscaFeita(false);
    setCarregando(true);
    setError('');

    try {
      const { data } = await ApiService.get<BuscarCepResponse>(
        `/api/diaristas/localidades?cep=${cep.replace(/\D/g, '')}`
      );

      setBuscaFeita(true);
      setDiaristas(data.diaristas);
      setDiaristasRestantes(data.quantidade_diaristas);
    } catch (error) {
      setError('CEP não encontrado');
    } finally {
      setCarregando(false);
    }
  }

  return { cep, setCep, cepValido, error, diaristas, buscaFeita, carregando, diaristasRestantes, buscarProfissionais };
}
