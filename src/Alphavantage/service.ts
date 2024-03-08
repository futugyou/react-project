import { useQuery } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'

import { News, Company, Balance, Cash, Earnings, Expected, Income, Commodities, CommoditiesEnum, EconomicIndicatorsEnum } from './model'

const alphavantage_server = import.meta.env.REACT_APP_ALPHAVANTAGE

const keyPerfix = 'alphavantage-'

export const useNewsData = (ticker: string, config = {}) => {
    const { data, isLoading, isFetching, isError, refetch }
        = useQueryToGetData(alphavantage_server + 'v1/news/' + ticker, keyPerfix + 'v1/news/' + ticker, config)

    return { data: data as News[], isLoading, isFetching, isError, refetch }
}

export const useCompanyData = (config = {}) => {
    const { data, isLoading, isFetching, isError, refetch }
        = useQueryToGetData(alphavantage_server + 'v1/company', keyPerfix + 'v1/company', config)

    return { data: data as Company[], isLoading, isFetching, isError, refetch }
}

export const useBalanceData = (config = {}) => {
    const { data, isLoading, isFetching, isError, refetch }
        = useQueryToGetData(alphavantage_server + 'v1/fundamentals/balance', keyPerfix + 'v1/fundamentals/balance', config)

    return { data: data as Balance[], isLoading, isFetching, isError, refetch }
}

export const useCashData = (config = {}) => {
    const { data, isLoading, isFetching, isError, refetch }
        = useQueryToGetData(alphavantage_server + 'v1/fundamentals/cash', keyPerfix + 'v1/fundamentals/cash', config)

    return { data: data as Cash[], isLoading, isFetching, isError, refetch }
}

export const useEarningsData = (config = {}) => {
    const { data, isLoading, isFetching, isError, refetch }
        = useQueryToGetData(alphavantage_server + 'v1/fundamentals/earnings', keyPerfix + 'v1/fundamentals/earnings', config)

    return { data: data as Earnings[], isLoading, isFetching, isError, refetch }
}

export const useExpectedData = (config = {}) => {
    const { data, isLoading, isFetching, isError, refetch }
        = useQueryToGetData(alphavantage_server + 'v1/fundamentals/expected', keyPerfix + 'v1/fundamentals/expected', config)

    return { data: data as Expected[], isLoading, isFetching, isError, refetch }
}

export const useIncomeData = (config = {}) => {
    const { data, isLoading, isFetching, isError, refetch }
        = useQueryToGetData(alphavantage_server + 'v1/fundamentals/income', keyPerfix + 'v1/fundamentals/income', config)

    return { data: data as Income[], isLoading, isFetching, isError, refetch }
}

// current type include: wti brent gas copper aluminum wheat corn cotton sugar coffee all 
export const useCommoditiesData = (type: CommoditiesEnum, config = {}) => {
    const { data, isLoading, isFetching, isError, refetch }
        = useQueryToGetData(alphavantage_server + 'v1/commodities/' + type, keyPerfix + 'v1/commodities/' + type, config)

    return { data: data as Commodities[], isLoading, isFetching, isError, refetch }
}

// current type include: realgdp realgdpcapita treasury interest cpi inflation retail durable unemployment payroll
export const useEconomicIndicatorsData = (type: EconomicIndicatorsEnum, config = {}) => {
    const { data, isLoading, isFetching, isError, refetch }
        = useQueryToGetData(alphavantage_server + 'v1/commodities/' + type, keyPerfix + 'v1/commodities/' + type, config)

    return { data: data as Commodities[], isLoading, isFetching, isError, refetch }
}

const useQueryToGetData = (url: string, key: string, config = {}) => {
    const options: AxiosRequestConfig = {
        url: url,
        method: "GET",
        headers: {
        },
    }

    const { isLoading, isError, data, refetch, isFetching } = useQuery({
        queryKey: [key],
        queryFn: () => axios(options).then(x => x.data),
        ...config,
    })

    return { data, isLoading, isFetching, isError, refetch }
}