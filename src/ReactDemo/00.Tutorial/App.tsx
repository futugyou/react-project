import './App.css'
import reactLogo from '../../assets/react.svg'

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // 接收基座传递的数据
    function dataListener(data: any) {
      if (data.path) {
        navigate(data.path)
      }
    }
    if (window.__MICRO_APP_ENVIRONMENT__) {
      window.eventCenterForAppNameVite.addDataListener(dataListener)
    }
    return () => {
      if (window.__MICRO_APP_ENVIRONMENT__) {
        // 解绑监听函数
        window.eventCenterForAppNameVite.removeDataListener(dataListener)
        // 清空当前子应用的所有绑定函数(全局数据函数除外)
        window.eventCenterForAppNameVite.clearDataListener()
      }
    }
  }, [])

  useEffect(() => {
    if (window.eventCenterForAppNameVite) {
      window.eventCenterForAppNameVite.dispatch({
        path: location.pathname,
      })
    }
  }, [location.pathname])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
