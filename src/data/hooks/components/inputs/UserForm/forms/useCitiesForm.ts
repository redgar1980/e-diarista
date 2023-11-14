import { useFormContext } from 'react-hook-form';
import { UserContext } from "data/contexts/UserContext";
import useCities from "data/hooks/useCities";
import { useContext, useEffect, useMemo } from "react";
import { FormValues } from 'data/@types/forms/FormValue';

export default function useCitiesForm(estado: string) {
    const {
        userState: {addressList},
    } = useContext(UserContext),
    listaCidades = useCities(estado),
    { register, setValue, watch} = useFormContext<FormValues>(),
    enderecosAtendidos = watch("enderecosAtendidos", []),
    citiesName = useMemo(() => {
         return (enderecosAtendidos ?? []).map((endereco) => endereco.cidade);
    }, [enderecosAtendidos]),
    options = useMemo(() => {
        return listaCidades.filter((item) => !citiesName.includes(item.cidade));
    }, [citiesName, enderecosAtendidos]);

    useEffect(() => {
        register("enderecosAtendidos", { value: [] })
    }, []);

    useEffect(() => {
        addressList.length && setValue("enderecosAtendidos", addressList);
    }, [addressList]);

    function handleNewCity(newValue: string | null) {
        if(newValue){
            const newCity = options.find((item) => item.cidade === newValue)
            newCity &&
                setValue("enderecosAtendidos", [...enderecosAtendidos, newCity]);
        }
    }

    function handleDelete(item: string) {
        setValue(
            "enderecosAtendidos", enderecosAtendidos.filter((city) => city.cidade !== item)
        );
    }

    return {
        options,
        handleNewCity,
        citiesList: listaCidades,
        citiesName,
        handleDelete,
    };
}