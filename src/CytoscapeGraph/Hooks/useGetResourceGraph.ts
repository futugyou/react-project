import { useQuery } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'

const configserver = import.meta.env.REACT_APP_FLOW_SERVER

const configPath = 'v1/awsconfig'

export const useGetResourceGraph = (config = {}) => {
    const jwtToken = JSON.parse(window.localStorage.getItem('auth') || '{}')
    const options: AxiosRequestConfig = {
        url: configserver + configPath,
        method: "GET",
        headers: {
            'Account-Id': 'aws-account-id-magic-code'
        },
    }

    options.headers!.Authorization = "Bearer " + jwtToken.access_token

    const { isLoading, isError, data, refetch, isFetching } = useQuery({
        queryKey: [configPath],
        queryFn: () => axios(options).then(x => x.data),
        ...config,
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