import { SectionContainer, Wave, SectionTitle, SectionSubTitle } from "./_frequent-question.styled";

const FrequestQuestion = () => {
    return (
        <div>
            <SectionContainer>
                <Wave src={"/img/home/waves.svg"} />
                <SectionTitle>Ainda está com dúvidas ?</SectionTitle>
                <SectionSubTitle>Veja abaixo as perguntas frequentes</SectionSubTitle>
            </SectionContainer>
        </div>
    );
};

export default FrequestQuestion;
