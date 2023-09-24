import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
//import { StatusProps } from './Status';

export const StatusStyled = styled(Typography)`
  display: inline-block;
  border-radius: 3px;
  color: white;
  padding: ${({ theme }) => theme.spacing(1, 2)};
  font-size: ${({ theme }) => theme.typography.body2.fontSize}
  vertical-align: middle;
`;
