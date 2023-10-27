import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import SafeEnvironment from "ui/components/feedback/SafeEnvironment/SafeEnvironment";
import BreadCrumb from "ui/components/navigation/BreadCrumb/BreadCrumb";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import Link from "ui/components/navigation/Link/Link";
import useCadastroDiarista from "data/hooks/pages/cadastro/useCadastroDiarista.page";
import { BrowserService } from "data/services/BrowserService";

// import { Component } from '@styles/pages/cadastro/diarista.styled';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "Diarista",
    },
  };
};

const Diarista: React.FC = () => {
  const { breadCrumberItem, step, setStep } = useCadastroDiarista();

  useEffect(() => {
    BrowserService.scrollToTop;
  }, [step]);

  return (
    <div>
      <SafeEnvironment />
      <BreadCrumb
        items={breadCrumberItem}
        selected={breadCrumberItem[step - 1]}
      />
      {step == 1 && (
        <PageTitle
          title="Precisamos conhecer um pouco sobre você!"
          subtitle={
            <span>
              Caso já tenha cadastro <Link href="/login">clique aqui</Link>
            </span>
          }
        />
      )}

      {step == 2 && (
        <PageTitle
          title="Quais cidades você atenderá?"
          subtitle={
            <span>
              Você pode escolher se aceita ou não um serviço. Então, não se
              preocupe se mora em uma grande cidade
            </span>
          }
        />
      )}
    </div>
  );
};

export default Diarista;
