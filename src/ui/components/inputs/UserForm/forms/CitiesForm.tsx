import useCitiesForm from "data/hooks/components/inputs/UserForm/forms/useCitiesForm"
import { CitiesSelection } from "../UserForm.styled"
import { Autocomplete, CircularProgress, Typography } from "@mui/material";
import { CidadeInterface } from "data/@types/EnderecoInteface";
import TextField from "ui/components/inputs/TextField/TextField";
import ChipField from "ui/components/data-display/ChipField/ChipField";

export const CitiesForm: React.FC<{ estado: string }> = ({ estado }) => {
    const {
        options,
        handleNewCity,
        citiesList,
        citiesName,
        handleDelete,
    } = useCitiesForm(estado);
    
    return <CitiesSelection>
        <Autocomplete
            value={{ cidade: "" } as CidadeInterface}
            onChange={(_event, newValue) => {
                newValue && handleNewCity(newValue.cidade);
            }}
            disablePortal
            options={options}
            isOptionEqualToValue={(option, value) => option.cidade === value.cidade}
            getOptionLabel={(option)=>option.cidade}
            loading={citiesList.length === 0}
            loadingText={"Carregando cidades..."}
            style={{ gridArea: "busca-cidade" }}
            noOptionsText={"Nenhuma cidade com esse nome"}
            renderInput={({ InputProps, ...params }) => {
                return (
                    <TextField 
                        label={"Busque pelo nome da cidade"}
                        InputProps={{
                            ...InputProps,
                            endAdornment: (
                                <>
                                    {citiesList.length ? (
                                        <i className="twf-search" />
                                    ) : (
                                        <CircularProgress />
                                    )}
                                   {InputProps.endAdornment} 
                                </>
                            ),
                        }}
                        required={false}
                        {...params}
                    />
                );
            }}
        />

        <Typography>Cidades selecionadas</Typography>
        <ChipField 
            itemsList={citiesName}
            onDelete={handleDelete}
            emptyMessage={"Nenhuma cidade selecionada ainda"}
        />
    </CitiesSelection>
}

