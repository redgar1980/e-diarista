import React from 'react';
import { GetStaticProps } from 'next';
import { Button, Container, Divider, Typography } from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import useOportunidades from 'data/hooks/pages/useOportunidades.page';
import DataList from 'ui/components/data-display/DataList/DataList';
import { ItemsContainer } from '@partials/encontrar-diarista/_detalhe-servico.styled';
import { TextFormatService } from 'data/services/TextFormatService';
import Table, { TableCell, TablePagination, TableRow } from 'ui/components/data-display/Table/Table';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import JobInformation from 'ui/components/data-display/JobInformation/JobInformation';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import { AvaliacaoUsuarioInterface } from 'data/@types/AvaliacaoUsuarioInterface';

// import { Component } from '@styles/pages/oportunidades.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Oportunidades',
        },
    };
};



const Oportunidades: React.FC = () => {
    const {  oportunidades, isMobile, totalComodos, podeCandidatar, currentPage, setCurrentPage, totalPages, itemsPerPage, oportunidadeSelecionada, setOportunidadeSelecionada } = useOportunidades();

    const oportunidadesMock = [
        {
            id: 1,
            data_atendimento: "2022-10-10",
            nome_servico: "Limpeza Pesada",
            preco: 140,
            cidade: "São Paulo",
            estado: "SP",
            quantidade_banheiros: 1,
            quantidade_cozinhas: 1,
            quantidade_outros: 1,
            quantidade_quartos: 2,
            quantidade_quintais: 3,
            quantidade_salas: 1,
            cliente: {
                nome_completo: "Rodrigo Custodio",
                foto_documento: "",
                reputacao: 3                
            },
            avaliacoes_cliente: []
        },
        {
            id: 2,
            data_atendimento: "2022-09-05",
            nome_servico: "Limpeza Diária",
            preco: 100,
            cidade: "São Paulo",
            estado: "SP",
            quantidade_banheiros: 2,
            quantidade_cozinhas: 1,
            quantidade_outros: 1,
            quantidade_quartos: 4,
            quantidade_quintais: 1,
            quantidade_salas: 1,
            cliente: {
                nome_completo: "Rodrigo Custodio",
                foto_documento: "",
                reputacao: 3                
            },
            avaliacoes_cliente: []
        },
        {
            id: 3,
            data_atendimento: "2022-09-08",
            nome_servico: "Limpeza Leve",
            preco: 80,
            cidade: "São Paulo",
            estado: "SP",
            quantidade_banheiros: 1,
            quantidade_cozinhas: 1,
            quantidade_outros: 0,
            quantidade_quartos: 2,
            quantidade_quintais: 1,
            quantidade_salas: 1,
            cliente: {
                nome_completo: "Rodrigo Custodio",
                foto_documento: "",
                reputacao: 3                
            },
            avaliacoes_cliente: []
        }
    ]
    return (
        <Container sx={{ mb: 5, p: 0}}>
            <PageTitle title="Oportunidades de trabalho" />
            {oportunidadesMock? (
                 isMobile ? (
                    oportunidadesMock.map((oportunidade) => {
                        return (
                            <DataList
                            key={oportunidade.id}
                                header={
                                    <>
                                        Data: {TextFormatService.reverseDate(
                                            oportunidade.data_atendimento as string
                                            )}
                                        <br />
                                        {oportunidade.nome_servico}
                                        <br />
                                        {TextFormatService.currency(oportunidade.preco)}
                                    </>
                                }
                                body={
                                    <>
                                        Cidade: {oportunidade.cidade}
                                        <br />
                                        Número de cômodos {totalComodos(oportunidade)}
                                    </>
                                }
                                actions={
                                    <>
                                    {podeCandidatar(oportunidade) && (
                                        <Button variant={"contained"} color={"secondary"} onClick={()=> setOportunidadeSelecionada(oportunidade)}>
                                            Se candidatar
                                        </Button>
                                    )}
                                    </>
                                }
                            />
                        )
                    })
                 ): (
                    <>
                        <Table 
                        header={[
                            "Data",
                            "Tipo de Serviço",
                            "Número de Cômodos",
                            "Cidade",
                            "Valor",
                            ""
                        ]}
                        data={oportunidadesMock}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        rowElement={(item, index)=>(
                            <TableRow key={index}>
                                <TableCell>
                                    <strong>
                                        {TextFormatService.reverseDate(item.data_atendimento as string)}
                                    </strong>
                                </TableCell>
                                <TableCell>
                                    {item.nome_servico}
                                </TableCell>
                                <TableCell>
                                    {totalComodos(item)} cômodos
                                </TableCell>
                                <TableCell>
                                    {item.cidade} - {item.estado}
                                </TableCell>
                                <TableCell>
                                    {TextFormatService.currency(item.preco)}
                                </TableCell>
                                <TableCell>
                                    {!podeCandidatar(item) && (
                                        <Button onClick={()=>setOportunidadeSelecionada(item)}>
                                            Se candidatar
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                            )}
                        />
                        <TablePagination 
                            count={totalPages}
                            page={currentPage}
                            onChange={(_event, nextPage)=> setCurrentPage(nextPage)}
                        />
                    </>
                 )
            ): (
                <Typography align="center">Nenhuma oportunidade ainda</Typography>
            )}

            <Dialog 
                isOpen={oportunidadeSelecionada !== undefined}
                onClose={() => setOportunidadeSelecionada(undefined)}
                title={"Se candidatar à diária"}
                subtitle={"Tem certeza que deseja se candidatar à diária abaixo?"}
            >
                <div>
                    <JobInformation>
                        <>
                            <div>
                                DATA: <strong>{TextFormatService.dataTime(oportunidadeSelecionada?.data_atendimento as string)}</strong>
                            </div>
                            <div>
                                Endereço: {" "} {TextFormatService.getAddress(oportunidadeSelecionada)}
                            </div>
                            <div>
                                Valor: <strong>{TextFormatService.currency(oportunidadeSelecionada?.preco)}</strong>
                            </div>
                        </>
                    </JobInformation>
                </div>
                <UserInformation 
                    name={oportunidadeSelecionada?.cliente.nome_completo ?? ""} 
                    rating={oportunidadeSelecionada?.cliente.reputacao ?? 0} 
                    picture={oportunidadeSelecionada?.cliente.foto_documento ?? ""}
                />
                <Divider />
                {oportunidadeSelecionada && oportunidadeSelecionada!.avaliacoes_cliente.length > 0 && (
                    <>
                        <Typography sx={{p: 3, fontWeight: "medium", bgcolor: "grey.50" }}>
                            Últimas avaliações do cliente
                        </Typography>
                        {oportunidadeSelecionada!.avaliacoes_cliente.map((item, index) => {
                            return (
                                <UserInformation 
                                    key={index}
                                    name={item.nome_avaliador} 
                                    rating={item.nota} 
                                    picture={item.foto_avaliador} 
                                    isRating={true}
                                />
                            )
                        })}
                    </>
                )}
                <Typography sx={{ p: 2 }} variant={"subtitle2"} color={"textSecondary"}>
                    Ao se candidatar você ainda não é o(a) diarista escolhido(a) para realizar
                    o trabalho. Vamos analisar suas qualificações e a distância para o local
                    da diária. Caso você seja a pessoa selecionada, receberá um email avisando.
                    Atente-se à sua caixa de entrada!
                </Typography>
            </Dialog>
        </Container>
    );
};

export default Oportunidades;