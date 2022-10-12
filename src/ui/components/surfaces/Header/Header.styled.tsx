import { styled } from "@mui/material/styles";
import { AppBar } from "@mui/material";


export const HeaderAppBar = styled(AppBar)`
    &.MuiAppBar-root {
        background-color: ${ ({theme}) => theme.palette.background.paper };
        box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.1);
        color: ${ ({theme}) => theme.palette.text.secondary };
    }
`;

export const HeaderLogo  = styled("img")``;