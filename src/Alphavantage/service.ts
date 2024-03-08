import { useQuery } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'

import { News, Company } from './model'

const alphavantage_server = import.meta.env.REACT_APP_ALPHAVANTAGE

const keyPerfix = 'alphavantage-'

export const useAlphavantageNewsData = (ticker: string, config = {}) => {
    const options: AxiosRequestConfig = {
        url: alphavantage_server + 'v1/news/' + ticker,
        method: "GET",
        headers: {
        },
    }

    const { isLoading, isError, data, refetch, isFetching } = useQuery({
        queryKey: [keyPerfix + 'v1/news/' + ticker],
        queryFn: () => axios<News[]>(options).then(x => x.data),
        ...config,
    })

    return {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    }
}

export const useAlphavantageCompanyData = (config = {}) => {
    const options: AxiosRequestConfig = {
        url: alphavantage_server + 'v1/company',
        method: "GET",
        headers: {
        },
    }

    const { isLoading, isError, data, refetch, isFetching } = useQuery({
        queryKey: [keyPerfix + 'v1/company'],
        queryFn: () => axios<Company[]>(options).then(x => x.data),
        ...config,
    })

    return {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    }
}