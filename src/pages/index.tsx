import React from "react";
import {
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import SafeEnvironment from "ui/components/feedback/SafeEnvironment/SafeEnvironment";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import UserInformation from "ui/components/data-display/UserInformation/UserInformation";
import TextFieldMask from "ui/components/inputs/TextFieldMask/TextFieldMask";
import {
  FormElementsContainer,
  ProfessionalsPaper,
  ProfessionalsContainer,
} from "ui/styles/pages/index.style";
import useIndex from "data/hooks/pages/useIndex.page";

export default function Home() {
  const {
    cep,
    setCep,
    cepIsValid,
    findProfessionals,
    erro,
    isFind,
    isLoading,
    professionals,
    professionalsRemaining,
  } = useIndex();
  return (
    <div>
      <SafeEnvironment />
      <PageTitle
        title={"Conheça os profissionais"}
        subtitle={
          "Preencha seu endereço e veja todos os profissionais de sua localidade"
        }
      />
      <Container>
        <FormElementsContainer>
          <TextFieldMask
            mask={"99.999-999"}
            label={"Digite seu CEP"}
            variant={"outlined"}
            value={cep}
            onChange={(event) => setCep(event.target.value)}
            fullWidth
          />

          {erro && <Typography color={"error"}>{erro}</Typography>}
          <Button
            variant={"contained"}
            color={"secondary"}
            sx={{ width: "220px" }}
            disabled={!cepIsValid || isLoading}
            onClick={() => findProfessionals(cep)}
          >
            {isLoading ? <CircularProgress size={20} /> : "Buscar"}
          </Button>
        </FormElementsContainer>

        {isFind &&
          (professionals.length > 0 ? (
            <ProfessionalsPaper>
              <ProfessionalsContainer>
                {professionals.map((professional, index) => {
                  return (
                    <UserInformation
                      key={index}
                      name={professional.nome_completo}
                      picture={professional.foto_usuario}
                      rating={professional.reputacao}
                      description={professional.cidade}
                    />
                  );
                })}
              </ProfessionalsContainer>

              <Container sx={{ textAlign: "center" }}>
                {professionalsRemaining > 0 && (
                  <Typography sx={{ mt: 5 }}>
                    ...e mais {professionalsRemaining}{" "}
                    {professionalsRemaining > 1
                      ? "profissionais atendem"
                      : "profissional atende"}
                    em sua região.
                  </Typography>
                )}
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  sx={{ mt: 5 }}
                >
                  Contratar um profissional
                </Button>
              </Container>
            </ProfessionalsPaper>
          ) : (
            <Typography align={"center"} color={"textPrimary"}>
              Ainda não temos nenhuma diarista em sua região
            </Typography>
          ))}
      </Container>
    </div>
  );
}
