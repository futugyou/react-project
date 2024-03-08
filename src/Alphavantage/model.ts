 
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
