import React, { PropsWithChildren } from "react";
import { AddressForm } from "ui/components/inputs/UserForm/UserForm";

// import { Component } from './_detalhe-servico.styled';

const DetalheServico: React.FC<PropsWithChildren> = () => {
  return (
    <div>
      <AddressForm />
    </div>
  );
};

export default DetalheServico;
