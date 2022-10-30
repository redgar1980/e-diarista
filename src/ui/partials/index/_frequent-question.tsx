import { AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material";
import { SectionContainer, Wave, SectionTitle, SectionSubTitle, AccordionStyled } from "./_frequent-question.styled";

const FrequestQuestion = () => {
    return (
        <div>
            <SectionContainer>
                <Wave src={"/img/home/waves.svg"} />
                <Container>
                    <SectionTitle>Ainda está com dúvidas ?</SectionTitle>
                    <SectionSubTitle>Veja abaixo as perguntas frequentes</SectionSubTitle>
                    <AccordionStyled>
                        <AccordionSummary expandIcon={<i className="twf-minus" />}>
                            <Typography color={"primary"}>qufhdsfhskdj</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>fdfdffd</Typography>
                        </AccordionDetails>
                    </AccordionStyled>
                </Container>
            </SectionContainer>
        </div>
    );
};

export default FrequestQuestion;
