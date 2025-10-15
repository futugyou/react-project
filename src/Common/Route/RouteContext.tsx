import React, { createContext, useContext, useMemo } from "react"
import { useLocation } from "react-router-dom"

interface RouteContextValue {
  level1: string
  level2: string
  fullPath: string
}

const RouteContext = createContext<RouteContextValue>({
  level1: "",
  level2: "",
  fullPath: "/",
})

export const RouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()

  const value = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean)
    return {
      level1: parts[0] || "",
      level2: parts[1] || "",
      fullPath: location.pathname,
    }
  }, [location.pathname])

  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
}

export const useRouteInfo = () => useContext(RouteContext)
