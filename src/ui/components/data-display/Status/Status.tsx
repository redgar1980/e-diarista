import React, { PropsWithChildren } from "react";
// import {} from '@mui/material';
import { StatusStyled } from "./Status.styled";
import { colors } from "@mui/material";
import { props } from "cypress/types/bluebird";

export interface StatusProps {
  colors?: "success" | "error" | "warning" | "primary" | "secondary";
}

const Status: React.FC<PropsWithChildren<StatusProps>> = ({
  colors = "success",
  ...props
}) => {
  return <StatusStyled sx={{ bgcolor: `${colors}.main` }} {...props} />;
};

export default Status;
