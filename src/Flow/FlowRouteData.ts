import React, { lazy } from 'react'

export interface FlowRouteData {
    name: string
    linkpath: string
    path: string
    display: string
    element: any
}

export const FlowRouteDataList: FlowRouteData[] = [{
    name: 'DependencyInjection',
    display: 'DI',
    linkpath: '/flow/dotnet/di',
    path: 'dotnet/di',
    element: lazy(() => import('./Dotnet/DependencyInjection/Flow')),
}, {
    name: 'file',
    display: 'FileSystem',
    linkpath: '/flow/dotnet/file',
    path: 'dotnet/file',
    element: lazy(() => import('./Dotnet/FileSystem/Flow')),
}, {
    name: 'configuration',
    display: 'Configuration',
    linkpath: '/flow/dotnet/conf',
    path: 'dotnet/conf',
    element: lazy(() => import('./Dotnet/Configuration/Flow')),
}, {
    name: 'options',
    display: 'Options',
    linkpath: '/flow/dotnet/options',
    path: 'dotnet/options',
    element: lazy(() => import('./Dotnet/Options/Flow')),
}, {
    name: 'tracesource',
    display: 'TraceSource',
    linkpath: '/flow/dotnet/tracesource',
    path: 'dotnet/tracesource',
    element: lazy(() => import('./Dotnet/TraceSource/Flow')),
}, {
    name: 'eventsource',
    display: 'EventSource',
    linkpath: '/flow/dotnet/eventsource',
    path: 'dotnet/eventsource',
    element: lazy(() => import('./Dotnet/EventSource/Flow')),
}, {
    name: 'diagnosticsource',
    display: 'DiagnosticSource',
    linkpath: '/flow/dotnet/diagnostic',
    path: 'dotnet/diagnostic',
    element: lazy(() => import('./Dotnet/DiagnosticSource/Flow')),
}, {
    name: 'ilogger',
    display: 'ILogger',
    linkpath: '/flow/dotnet/ilogger',
    path: 'dotnet/ilogger',
    element: lazy(() => import('./Dotnet/ILogger/Flow')),
}, {
    name: 'metrics',
    display: 'Metrics',
    linkpath: '/flow/dotnet/metrics',
    path: 'dotnet/metrics',
    element: lazy(() => import('./Dotnet/Metrics/Flow')),
}, {
    name: 'objectpool',
    display: 'ObjectPool',
    linkpath: '/flow/dotnet/objectpool',
    path: 'dotnet/objectpool',
    element: lazy(() => import('./Dotnet/ObjectPool/Flow')),
}, {
    name: 'cache',
    display: 'Cache',
    linkpath: '/flow/dotnet/cache',
    path: 'dotnet/cache',
    element: lazy(() => import('./Dotnet/Cache/Flow')),
}, {
    name: 'httpclient',
    display: 'HttpClient',
    linkpath: '/flow/dotnet/httpclient',
    path: 'dotnet/httpclient',
    element: lazy(() => import('./Dotnet/HttpClient/Flow')),
}]