import React, { lazy } from 'react'

export interface FlowRouteData {
    name: string
    linkpath: string
    path: string
    display: string
    group: string
    element: any
}

export const FlowRouteDataList: FlowRouteData[] = [{
    name: 'DependencyInjection',
    display: 'DI',
    group: 'NetCore',
    linkpath: '/flow/dotnet/di',
    path: 'dotnet/di',
    element: lazy(() => import('./Dotnet/DependencyInjection/Flow')),
}, {
    name: 'file',
    display: 'FileSystem',
    group: 'NetCore',
    linkpath: '/flow/dotnet/file',
    path: 'dotnet/file',
    element: lazy(() => import('./Dotnet/FileSystem/Flow')),
}, {
    name: 'configuration',
    display: 'Configuration',
    group: 'NetCore',
    linkpath: '/flow/dotnet/conf',
    path: 'dotnet/conf',
    element: lazy(() => import('./Dotnet/Configuration/Flow')),
}, {
    name: 'options',
    display: 'Options',
    group: 'NetCore',
    linkpath: '/flow/dotnet/options',
    path: 'dotnet/options',
    element: lazy(() => import('./Dotnet/Options/Flow')),
}, {
    name: 'tracesource',
    display: 'TraceSource',
    group: 'NetCore',
    linkpath: '/flow/dotnet/tracesource',
    path: 'dotnet/tracesource',
    element: lazy(() => import('./Dotnet/TraceSource/Flow')),
}, {
    name: 'eventsource',
    display: 'EventSource',
    group: 'NetCore',
    linkpath: '/flow/dotnet/eventsource',
    path: 'dotnet/eventsource',
    element: lazy(() => import('./Dotnet/EventSource/Flow')),
}, {
    name: 'diagnosticsource',
    display: 'DiagnosticSource',
    group: 'NetCore',
    linkpath: '/flow/dotnet/diagnostic',
    path: 'dotnet/diagnostic',
    element: lazy(() => import('./Dotnet/DiagnosticSource/Flow')),
}, {
    name: 'ilogger',
    display: 'ILogger',
    group: 'NetCore',
    linkpath: '/flow/dotnet/ilogger',
    path: 'dotnet/ilogger',
    element: lazy(() => import('./Dotnet/ILogger/Flow')),
}, {
    name: 'metrics',
    display: 'Metrics',
    group: 'NetCore',
    linkpath: '/flow/dotnet/metrics',
    path: 'dotnet/metrics',
    element: lazy(() => import('./Dotnet/Metrics/Flow')),
}, {
    name: 'objectpool',
    display: 'ObjectPool',
    group: 'NetCore',
    linkpath: '/flow/dotnet/objectpool',
    path: 'dotnet/objectpool',
    element: lazy(() => import('./Dotnet/ObjectPool/Flow')),
}, {
    name: 'cache',
    display: 'Cache',
    group: 'NetCore',
    linkpath: '/flow/dotnet/cache',
    path: 'dotnet/cache',
    element: lazy(() => import('./Dotnet/Cache/Flow')),
}, {
    name: 'httpclient',
    display: 'HttpClient',
    group: 'NetCore',
    linkpath: '/flow/dotnet/httpclient',
    path: 'dotnet/httpclient',
    element: lazy(() => import('./Dotnet/HttpClient/Flow')),
}, {
    name: 'objectpool1',
    display: 'ObjectPool1',
    group: 'Fake',
    linkpath: '/flow/dotnet/objectpool1',
    path: 'dotnet/objectpool1',
    element: lazy(() => import('./Dotnet/ObjectPool/Flow')),
}, {
    name: 'cache1',
    display: 'Cache1',
    group: 'Fake',
    linkpath: '/flow/dotnet/cache1',
    path: 'dotnet/cache1',
    element: lazy(() => import('./Dotnet/Cache/Flow')),
}, {
    name: 'httpclient1',
    display: 'HttpClient1',
    group: 'Fake',
    linkpath: '/flow/dotnet/httpclient1',
    path: 'dotnet/httpclient1',
    element: lazy(() => import('./Dotnet/HttpClient/Flow')),
}, {
    name: 'objectpool11',
    display: 'ObjectPool11',
    group: 'Fake1',
    linkpath: '/flow/dotnet/objectpool11',
    path: 'dotnet/objectpool11',
    element: lazy(() => import('./Dotnet/ObjectPool/Flow')),
}, {
    name: 'cache11',
    display: 'Cache11',
    group: 'Fake1',
    linkpath: '/flow/dotnet/cache11',
    path: 'dotnet/cache11',
    element: lazy(() => import('./Dotnet/Cache/Flow')),
}, {
    name: 'httpclient11',
    display: 'HttpClient11',
    group: 'Fake1',
    linkpath: '/flow/dotnet/httpclient11',
    path: 'dotnet/httpclient11',
    element: lazy(() => import('./Dotnet/HttpClient/Flow')),
}]