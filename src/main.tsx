import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Spinner from 'react-bootstrap/Spinner'

import { AuthProvider } from './Auth/index'
import authService from "./Auth"

import { router } from './Route'

declare global {
  interface Window {
    eventCenterForAppNameVite: any
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: string
    __MICRO_APP_BASE_APPLICATION__: string
    __MICRO_APP_BASE_ROUTE__: string
  }
}

// 与基座的数据交互
function handleMicroData () {
  // 是否是微前端环境
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    console.log('child-react17 getData:', window.eventCenterForAppNameVite.getData());

    // 监听基座下发的数据变化
    window.eventCenterForAppNameVite.addDataListener((data: Record<string, unknown>) => {
      console.log('child-react17 addDataListener:', data);
    })

    // 向基座发送数据
    setTimeout(() => {
      window.eventCenterForAppNameVite.dispatch({ myname: 'child-react17' });
    }, 3000)
  }
}

var openairoot: ReactDOM.Root 

function mount() {
    openairoot = ReactDOM.createRoot(document.getElementById('openai-web-root') as HTMLElement)
    openairoot.render(
    <React.StrictMode>
      <Suspense fallback={<Spinner animation="border" variant="dark" />}>
        <AuthProvider authService={authService} >
          <RouterProvider router={router} />
        </AuthProvider>
      </Suspense>
    </React.StrictMode>,
  )

  handleMicroData()
}

// 将卸载操作放入 unmount 函数
function unmount() {
  openairoot.unmount()
  window.eventCenterForAppNameVite?.clearDataListener()
  console.log('openai-web unmount');
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
  // @ts-ignore
  window['micro-app-openai-web'] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount();
}
