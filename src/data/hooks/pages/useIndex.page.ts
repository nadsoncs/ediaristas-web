import { useState, useMemo } from "react";
import { UserShortInterface } from "data/@types/UserInterface";
import { ValidationService } from "data/services/ValidationService";
import { ApiService } from "data/services/ApiService";

export default function useIndex() {
  const [cep, setCep] = useState("");
  const [erro, setErro] = useState("");
  const [isFind, setIsFind] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [professionals, setProfessionals] = useState(
    [] as UserShortInterface[]
  );
  const [professionalsRemaining, setProfessionalsRemaining] = useState(0);
  const cepIsValid = useMemo(() => {
    return ValidationService.cep(cep);
  }, [cep]);

  async function findProfessionals(cep: string) {
    setIsFind(false);
    setIsLoading(false);
    setErro("");

    try {
      const { data } = await ApiService.get<{
        diaristas: UserShortInterface[];
        quantidade_diaristas: number;
      }>("/api/diaristas-cidade?cep=" + cep.replace(/\D/g, ""));
      setProfessionals(data.diaristas);
      setProfessionalsRemaining(data.quantidade_diaristas);
      setIsFind(true);
      setIsLoading(false);
    } catch (error) {
      setErro("CEP não encontrado");
      setIsLoading(false);
    }
  }
  return {
    cep,
    setCep,
    cepIsValid,
    findProfessionals,
    erro,
    isFind,
    isLoading,
    professionals,
    professionalsRemaining,
  };
}
