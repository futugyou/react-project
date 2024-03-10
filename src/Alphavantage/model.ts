
export interface News {
    Id: string
    Title: string
    URL: string
    TimePublished: string
    Authors: string[]
    Summary: string
    BannerImage: string
    Source: string
    CategoryWithinSource: string
    SourceDomain: string
    Topics: string[]
    OverallSentimentScore: number
    OverallSentimentLabel: string
    TickerSentiment: string[]
}

export interface Company {
    Id: string
    Symbol: string
    Name: string
    Type: string
    Region: string
    MarketOpen: string
    MarketClose: string
    Timezone: string
    Currency: string
    MatchScore: number
    AssetType: string
    Description: string
    Cik: string
    Exchange: string
    Country: string
    Sector: string
    Industry: string
    Address: string
    FiscalYearEnd: string
    LatestQuarter: string
    MarketCapitalization: string
    Ebitda: string
    PERatio: string
    PEGRatio: string
    BookValue: string
    DividendPerShare: string
    DividendYield: string
    Eps: string
    RevenuePerShareTTM: string
    ProfitMargin: string
    OperatingMarginTTM: string
    ReturnOnAssetsTTM: string
    ReturnOnEquityTTM: string
    RevenueTTM: string
    GrossProfitTTM: string
    DilutedEPSTTM: string
    QuarterlyEarningsGrowthYOY: string
    QuarterlyRevenueGrowthYOY: string
    AnalystTargetPrice: string
    TrailingPE: string
    ForwardPE: string
    PriceToSalesRatioTTM: string
    PriceToBookRatio: string
    EVToRevenue: string
    EVToEBITDA: string
    Beta: string
    The52WeekHigh: string
    The52WeekLow: string
    The50DayMovingAverage: string
    The200DayMovingAverage: string
    SharesOutstanding: string
    DividendDate: string
    ExDividendDate: string
}

export interface Balance {
    Id: string
    Symbol: string
    DataType: string
    FiscalDateEnding: string
    ReportedCurrency: string
    TotalAssets: string
    TotalCurrentAssets: string
    CashAndCashEquivalentsAtCarryingValue: string
    CashAndShortTermInvestments: string
    Inventory: string
    CurrentNetReceivables: string
    TotalNonCurrentAssets: string
    PropertyPlantEquipment: string
    AccumulatedDepreciationAmortizationPPE: string
    IntangibleAssets: string
    IntangibleAssetsExcludingGoodwill: string
    Goodwill: string
    Investments: string
    LongTermInvestments: string
    ShortTermInvestments: string
    OtherCurrentAssets: string
    OtherNonCurrentAssets: string
    TotalLiabilities: string
    TotalCurrentLiabilities: string
    CurrentAccountsPayable: string
    DeferredRevenue: string
    CurrentDebt: string
    ShortTermDebt: string
    TotalNonCurrentLiabilities: string
    CapitalLeaseObligations: string
    LongTermDebt: string
    CurrentLongTermDebt: string
    LongTermDebtNoncurrent: string
    ShortLongTermDebtTotal: string
    OtherCurrentLiabilities: string
    OtherNonCurrentLiabilities: string
    TotalShareholderEquity: string
    TreasuryStock: string
    RetainedEarnings: string
    CommonStock: string
    CommonStockSharesOutstanding: string
}

export interface Cash {
    Id: string
    Symbol: string
    DataType: string
    FiscalDateEnding: string
    ReportedCurrency: string
    OperatingCashflow: string
    PaymentsForOperatingActivities: string
    ProceedsFromOperatingActivities: string
    ChangeInOperatingLiabilities: string
    ChangeInOperatingAssets: string
    DepreciationDepletionAndAmortization: string
    CapitalExpenditures: string
    ChangeInReceivables: string
    ChangeInInventory: string
    ProfitLoss: string
    CashflowFromInvestment: string
    CashflowFromFinancing: string
    ProceedsFromRepaymentsOfShortTermDebt: string
    PaymentsForRepurchaseOfCommonStock: string
    PaymentsForRepurchaseOfEquity: string
    PaymentsForRepurchaseOfPreferredStock: string
    DividendPayout: string
    DividendPayoutCommonStock: string
    DividendPayoutPreferredStock: string
    ProceedsFromIssuanceOfCommonStock: string
    ProceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet: string
    ProceedsFromIssuanceOfPreferredStock: string
    ProceedsFromRepurchaseOfEquity: string
    ProceedsFromSaleOfTreasuryStock: string
    ChangeInCashAndCashEquivalents: string
    ChangeInExchangeRate: string
    NetIncome: string
}

export interface Earnings {
    Id: string
    Symbol: string
    DataType: string
    FiscalDateEnding: string
    ReportedDate: string
    ReportedEPS: string
    EstimatedEPS: string
    Surprise: string
    SurprisePercentage: string
}

export interface Expected {
    Id: string
    Symbol: string
    Name: string
    ReportDate: string
    FiscalDateEnding: string
    Estimate: number
    Currency: string
}

export interface Income {
    Id: string
    Symbol: string
    DataType: string
    FiscalDateEnding: string
    ReportedCurrency: string
    GrossProfit: string
    TotalRevenue: string
    CostOfRevenue: string
    CostofGoodsAndServicesSold: string
    OperatingIncome: string
    SellingGeneralAndAdministrative: string
    ResearchAndDevelopment: string
    OperatingExpenses: string
    InvestmentIncomeNet: string
    NetInterestIncome: string
    InterestIncome: string
    InterestExpense: string
    NonInterestIncome: string
    OtherNonOperatingIncome: string
    Depreciation: string
    DepreciationAndAmortization: string
    IncomeBeforeTax: string
    IncomeTaxExpense: string
    InterestAndDebtExpense: string
    NetIncomeFromContinuingOperations: string
    ComprehensiveIncomeNetOfTax: string
    Ebit: string
    Ebitda: string
    NetIncome: string
}

export interface Commodities {
    Id: string
    Name: string
    DataType: string
    Interval: string
    Unit: string
    Date: string
    Value: string
}

export interface StockSeries {
    Id: string
    Symbol: string
    Time: Date
    Open: number
    High: number
    Low: number
    Close: number
    Volume: number
}

export enum CommoditiesEnum {
    Wti = "wti",
    Brent = "brent",
    Gas = "gas",
    Copper = "copper",
    Aluminum = "aluminum",
    Wheat = "wheat",
    Corn = "corn",
    Cotton = "cotton",
    Sugar = "sugar",
    Coffee = "coffee"
}

export enum EconomicIndicatorsEnum {
    Realgdp = "realgdp",
    Realgdpcapita = "realgdpcapita",
    Treasury = "treasury",
    Interest = "interest",
    Cpi = "cpi",
    Inflation = "inflation",
    Retail = "retail",
    Durable = "durable",
    Unemployment = "unemployment",
    Payroll = "payroll"
}
