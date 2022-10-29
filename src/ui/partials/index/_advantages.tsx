import { Container, ListItem, ListItemAvatar } from "@mui/material";
import { GradientBackground, ListStyle, SectionTitle, AvatarStyled, ListItemTextStyled} from "./_advantages.style";

const Advantages = () => {
    return <GradientBackground>
        <Container>
            <SectionTitle>Por que usar o E-diaristas?</SectionTitle>
            <ListStyle>
                <ListItem>
                    <ListItemAvatar>
                        <AvatarStyled>
                            <i className="twf-certificate" />
                        </AvatarStyled>
                    </ListItemAvatar>
                    <ListItemTextStyled primary={'Diversidade'} secondary={'São mais de 5.000 profissionais esperando por você!'} />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <AvatarStyled>
                            <i className="twf-certificate" />
                        </AvatarStyled>
                    </ListItemAvatar>
                    <ListItemTextStyled primary={'Diversidade'} secondary={'São mais de 5.000 profissionais esperando por você!'} />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <AvatarStyled>
                            <i className="twf-certificate" />
                        </AvatarStyled>
                    </ListItemAvatar>
                    <ListItemTextStyled primary={'Diversidade'} secondary={'São mais de 5.000 profissionais esperando por você!'} />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <AvatarStyled>
                            <i className="twf-certificate" />
                        </AvatarStyled>
                    </ListItemAvatar>
                    <ListItemTextStyled primary={'Diversidade'} secondary={'São mais de 5.000 profissionais esperando por você!'} />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <AvatarStyled>
                            <i className="twf-certificate" />
                        </AvatarStyled>
                    </ListItemAvatar>
                    <ListItemTextStyled primary={'Diversidade'} secondary={'São mais de 5.000 profissionais esperando por você!'} />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <AvatarStyled>
                            <i className="twf-certificate" />
                        </AvatarStyled>
                    </ListItemAvatar>
                    <ListItemTextStyled primary={'Diversidade'} secondary={'São mais de 5.000 profissionais esperando por você!'} />
                </ListItem>
            </ListStyle>
        </Container>
    </GradientBackground>;
}

export default Advantages;