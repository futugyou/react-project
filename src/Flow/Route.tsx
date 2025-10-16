
import React, { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { RouteDescription } from '@/Common/Route/RouteDescription'

const FlowPanel = lazy(() => import('./FlowPanel'))
const DemoFlow = lazy(() => import('./DemoFlow'))

export const FlowRouteDataList: RouteDescription = {
    display: 'Flow',
    path: '/flow',
    element: <FlowPanel />,
    children: [
        {
            display: '',
            path: '',
            element: React.createElement(lazy(() => import('./DemoFlow'))),
            show: () => false,
        },
        {
            display: 'Sample',
            path: 'sample',
            element: React.createElement(lazy(() => import('./DemoFlow'))),
        },
        {
            display: '',
            path: '',
            element: React.createElement(lazy(() => import('@/CytoscapeGraph/CytoscapePanel'))),
            show: () => false,
        }, {
            display: 'Cytoscape',
            path: 'cytoscape',
            element: React.createElement(lazy(() => import('@/CytoscapeGraph/CytoscapePanel'))),
        },
        {
            display: 'NetCore',
            path: 'dotnet',
            children: [
                {
                    display: '',
                    path: '',
                    element: React.createElement(lazy(() => import('./Dotnet/DependencyInjection/Flow'))),
                    show: () => false,
                },
                {
                    display: 'DI',
                    path: 'di',
                    element: React.createElement(lazy(() => import('./Dotnet/DependencyInjection/Flow'))),
                },
                {
                    display: 'FileSystem',
                    path: 'file',
                    element: React.createElement(lazy(() => import('./Dotnet/FileSystem/Flow'))),
                }, {
                    display: 'Configuration',
                    path: 'conf',
                    element: React.createElement(lazy(() => import('./Dotnet/Configuration/Flow'))),
                }, {
                    display: 'Options',
                    path: 'options',
                    element: React.createElement(lazy(() => import('./Dotnet/Options/Flow'))),
                }, {
                    display: 'TraceSource',
                    path: 'tracesource',
                    element: React.createElement(lazy(() => import('./Dotnet/TraceSource/Flow'))),
                }, {
                    display: 'EventSource',
                    path: 'eventsource',
                    element: React.createElement(lazy(() => import('./Dotnet/EventSource/Flow'))),
                }, {
                    display: 'DiagnosticSource',
                    path: 'diagnostic',
                    element: React.createElement(lazy(() => import('./Dotnet/DiagnosticSource/Flow'))),
                }, {
                    display: 'ILogger',
                    path: 'ilogger',
                    element: React.createElement(lazy(() => import('./Dotnet/ILogger/Flow'))),
                }, {
                    display: 'Metrics',
                    path: 'metrics',
                    element: React.createElement(lazy(() => import('./Dotnet/Metrics/Flow'))),
                }, {
                    display: 'ObjectPool',
                    path: 'objectpool',
                    element: React.createElement(lazy(() => import('./Dotnet/ObjectPool/Flow'))),
                }, {
                    display: 'Cache',
                    path: 'cache',
                    element: React.createElement(lazy(() => import('./Dotnet/Cache/Flow'))),
                }, {
                    display: 'HttpClient',
                    path: 'httpclient',
                    element: React.createElement(lazy(() => import('./Dotnet/HttpClient/Flow'))),
                }, {
                    display: 'Host',
                    path: 'host',
                    element: React.createElement(lazy(() => import('./Dotnet/Host/Flow'))),
                }, {
                    display: 'WebApplication',
                    path: 'webapp',
                    element: React.createElement(lazy(() => import('./Dotnet/WebApplication/Flow'))),
                }, {
                    display: 'Server',
                    path: 'server',
                    element: React.createElement(lazy(() => import('./Dotnet/Server/Flow'))),
                }, {
                    display: 'StaticFile',
                    path: 'staticfile',
                    element: React.createElement(lazy(() => import('./Dotnet/StaticFile/Flow'))),
                }, {
                    display: 'Routing',
                    path: 'routing',
                    element: React.createElement(lazy(() => import('./Dotnet/Routing/Flow'))),
                }, {
                    display: 'Exception',
                    path: 'exception',
                    element: React.createElement(lazy(() => import('./Dotnet/Exception/Flow'))),
                }, {
                    display: 'HttpCache',
                    path: 'httpcache',
                    element: React.createElement(lazy(() => import('./Dotnet/HttpCache/Flow'))),
                }, {
                    display: 'Session',
                    path: 'session',
                    element: React.createElement(lazy(() => import('./Dotnet/Session/Flow'))),
                }, {
                    display: 'Https',
                    path: 'https',
                    element: React.createElement(lazy(() => import('./Dotnet/Https/Flow'))),
                }, {
                    display: 'Rewrite',
                    path: 'rewrite',
                    element: React.createElement(lazy(() => import('./Dotnet/Rewrite/Flow'))),
                }, {
                    display: 'RateLimiting',
                    path: 'ratelimiting',
                    element: React.createElement(lazy(() => import('./Dotnet/RateLimiting/Flow'))),
                }, {
                    display: 'Cors',
                    path: 'cors',
                    element: React.createElement(lazy(() => import('./Dotnet/Cors/Flow'))),
                }, {
                    display: 'HealthChecks',
                    path: 'healthchecks',
                    element: React.createElement(lazy(() => import('./Dotnet/HealthChecks/Flow'))),
                }, {
                    display: 'Authentication',
                    path: 'authentication',
                    element: React.createElement(lazy(() => import('./Dotnet/Authentication/Flow'))),
                }, {
                    display: 'Auth-Handler',
                    path: 'authenticationhandler',
                    element: React.createElement(lazy(() => import('./Dotnet/AuthenticationHandler/Flow'))),
                }, {
                    display: 'Authorization',
                    path: 'authorization',
                    element: React.createElement(lazy(() => import('./Dotnet/Authorization/Flow'))),
                }
            ]
        }
    ],
}