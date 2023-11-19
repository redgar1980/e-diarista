import { styled } from '@mui/material/styles';
import {
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  IconButton as MuiIconButton,
} from '@mui/material';
//import { DialogProps } from './Dialog';

export const DialogContainer = styled(MuiDialog)``;

export const DialogTitle = styled(MuiDialogTitle)`
  position: relative;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  .MuitTypography-root {
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    &.MuiDialogTitle-root {
      padding: ${({ theme }) => theme.spacing(1.5)};
    }
  }
`;

export const DialogContent = styled(MuiDialogContent)`
  &.MuiDialogContent-root {
    padding: ${( { theme }) => theme.spacing(1.5)};
    ${({ theme }) => theme.breakpoints.up("md")} {
      padding: ${( { theme }) => theme.spacing(3, 6, 0)};
    }
  }
`;

export const DialogActions = styled(MuiDialogActions)`
  ${({ theme }) => theme.breakpoints.up("md")} {
    &.MuiDialogActions-root{
      position: relative;

      &::before {
        content: "";
        position: absolute;
        height: 1px;
        top: 0;
        right: ${({ theme }) => theme.spacing(6)};
        left: ${({ theme }) => theme.spacing(6)};
        background-color: ${({ theme }) => theme.palette.grey[200]}
      }
    }
  }
`;

export const CloseButton = styled(MuiIconButton)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  i {
    font-size: 16px;
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
`;

export const DialogSubtitle = styled("h3")`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size:  ${({ theme }) => theme.typography.body1.fontSize};
  margin:  ${({ theme }) => theme.spacing(0, 0, 3)};
`;
