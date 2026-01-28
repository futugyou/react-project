import { useQuery } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'
import { ConfigResourceData } from '../Processors/APIModel'

const configserver = import.meta.env.REACT_APP_FLOW_SERVER

export const useGetResourceGraph = (configPath: string) => {
    const options: AxiosRequestConfig = {
        url: configserver + configPath,
        method: "GET",
        headers: {
            'Account-Id': 'aws-account-id-magic-code'
        },
    }

    const { isLoading, isError, data, refetch, isFetching } = useQuery({
        queryKey: [configPath],
        queryFn: () => axios<ConfigResourceData>(options).then(x => x.data),
    })

    return {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
        status: getStatus(isFetching, isError)
    }
}

export const getStatus = (isFetching: boolean, isError: boolean) => {
    if (isFetching) {
        return 'loading'
    }
    return isError ? 'error' : 'finished'
}