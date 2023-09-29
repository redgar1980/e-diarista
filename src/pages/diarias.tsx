import React from "react";
import { GetStaticProps } from "next";
import MinhasDiarias from "@partials/diarias/_minhas-diarias";
import useMinhasDiarias from "data/hooks/pages/diarias/useMinhasDiarias.page";

// import { Component } from '@styles/pages/diarias.styled';

export const getStaticProps: GetStaticProps = async () => {
  const { isMobile } = useMinhasDiarias();
  return {
    props: {
      title: "Diárias",
    },
  };
};

const Diarias: React.FC = () => {
  return (
    <div>
      <MinhasDiarias />
    </div>
  );
};

export default Diarias;
