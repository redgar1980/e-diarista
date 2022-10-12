import { Container, Toolbar } from "@mui/material";
import { HeaderAppBar, HeaderLogo } from "./Header.styled";

const Header: React.FC = () => {
    return <HeaderDesktop />;
};

export default Header;

const HeaderDesktop: React.FC = () => {
    return ( 
        <HeaderAppBar>
            <Toolbar component={Container}>
                <HeaderLogo src="/img/logos/logo.svg" alt="e-diaristas"/>                
            </Toolbar>
        </HeaderAppBar>);
};