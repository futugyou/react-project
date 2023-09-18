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
    name: 'host',
    display: 'Host',
    group: 'NetCore',
    linkpath: '/flow/dotnet/host',
    path: 'dotnet/host',
    element: lazy(() => import('./Dotnet/Host/Flow')),
}, {
    name: 'webapp',
    display: 'WebApplication',
    group: 'NetCore',
    linkpath: '/flow/dotnet/webapp',
    path: 'dotnet/webapp',
    element: lazy(() => import('./Dotnet/WebApplication/Flow')),
}, {
    name: 'server',
    display: 'Server',
    group: 'NetCore',
    linkpath: '/flow/dotnet/server',
    path: 'dotnet/server',
    element: lazy(() => import('./Dotnet/Server/Flow')),
}, {
    name: 'staticfile',
    display: 'StaticFile',
    group: 'NetCore',
    linkpath: '/flow/dotnet/staticfile',
    path: 'dotnet/staticfile',
    element: lazy(() => import('./Dotnet/StaticFile/Flow')),
}, {
    name: 'routing',
    display: 'Routing',
    group: 'NetCore',
    linkpath: '/flow/dotnet/routing',
    path: 'dotnet/routing',
    element: lazy(() => import('./Dotnet/Routing/Flow')),
}, {
    name: 'exception',
    display: 'Exception',
    group: 'NetCore',
    linkpath: '/flow/dotnet/exception',
    path: 'dotnet/exception',
    element: lazy(() => import('./Dotnet/Exception/Flow')),
}, {
    name: 'httpcache',
    display: 'HttpCache',
    group: 'NetCore',
    linkpath: '/flow/dotnet/httpcache',
    path: 'dotnet/httpcache',
    element: lazy(() => import('./Dotnet/HttpCache/Flow')),
}, {
    name: 'session',
    display: 'Session',
    group: 'NetCore',
    linkpath: '/flow/dotnet/session',
    path: 'dotnet/session',
    element: lazy(() => import('./Dotnet/Session/Flow')),
},{
    name: 'https',
    display: 'Https',
    group: 'NetCore',
    linkpath: '/flow/dotnet/https',
    path: 'dotnet/https',
    element: lazy(() => import('./Dotnet/Https/Flow')),
},]