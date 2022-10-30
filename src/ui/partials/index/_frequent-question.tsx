import { AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material";
import { useState } from "react";
import { SectionContainer, Wave, SectionTitle, SectionSubTitle, AccordionStyled } from "./_frequent-question.styled";

const questionList = [
    {
        question: "Dúvida 1",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam blandit volutpat luctus. Nunc id lectus aliquam, condimentum ante nec, condimentum tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas efficitur ante non facilisis. Nam eu massa pharetra, dapibus ligula eu, dignissim magna. Sed lobortis suscipit nunc. Fusce risus sem, dapibus vitae massa et, consectetur posuere nulla.",
    },
    {
        question: "Dúvida 2",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam blandit volutpat luctus. Nunc id lectus aliquam, condimentum ante nec, condimentum tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas efficitur ante non facilisis. Nam eu massa pharetra, dapibus ligula eu, dignissim magna. Sed lobortis suscipit nunc. Fusce risus sem, dapibus vitae massa et, consectetur posuere nulla.",
    },
    {
        question: "Dúvida 3",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam blandit volutpat luctus. Nunc id lectus aliquam, condimentum ante nec, condimentum tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas efficitur ante non facilisis. Nam eu massa pharetra, dapibus ligula eu, dignissim magna. Sed lobortis suscipit nunc. Fusce risus sem, dapibus vitae massa et, consectetur posuere nulla.",
    },
    {
        question: "Dúvida 4",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam blandit volutpat luctus. Nunc id lectus aliquam, condimentum ante nec, condimentum tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas efficitur ante non facilisis. Nam eu massa pharetra, dapibus ligula eu, dignissim magna. Sed lobortis suscipit nunc. Fusce risus sem, dapibus vitae massa et, consectetur posuere nulla.",
    },
];

const FrequestQuestion = () => {
    const [activeAccordion, setActiveAccordion] = useState(0);

    function isOpen(accordionIndex: number): boolean {
        return activeAccordion === accordionIndex;
    }

    function changeOpenAccordion(accordionIndex: number): void {
        if (isOpen(accordionIndex)) {
            setActiveAccordion(0);
        } else {
            setActiveAccordion(accordionIndex);
        }
    }

    function getIcon(accordionIndex: number): string {
        return isOpen(accordionIndex) ? "twf-minus" : "twf-plus";
    }
    return (
        <div>
            <SectionContainer>
                <Wave src={"/img/home/waves.svg"} />
                <Container>
                    <SectionTitle>Ainda está com dúvidas ?</SectionTitle>
                    <SectionSubTitle>Veja abaixo as perguntas frequentes</SectionSubTitle>

                    {questionList.map((item, index) => (
                        <AccordionStyled
                            key={index}
                            expanded={isOpen(index + 1)}
                            onChange={() => changeOpenAccordion(index + 1)}
                        >
                            <AccordionSummary expandIcon={<i className={getIcon(index + 1)} />}>
                                <Typography color={"primary"}>{item.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{item.answer}</Typography>
                            </AccordionDetails>
                        </AccordionStyled>
                    ))}
                </Container>
            </SectionContainer>
        </div>
    );
};

export default FrequestQuestion;
