import { Container, Toolbar } from "@mui/material";
import Link from "ui/components/navegation/Link/Link";
import { HeaderAppBar, HeaderLogo } from "./Header.styled";

const Header: React.FC = () => {
    return <HeaderDesktop />;
};

export default Header;

const HeaderDesktop: React.FC = () => {
    return ( 
        <HeaderAppBar>
            <Toolbar component={Container}>
                <Link href="/">
                    <HeaderLogo src="/img/logos/logo.svg" alt="e-diaristas"/>                
                </Link>
            </Toolbar>
        </HeaderAppBar>);
};