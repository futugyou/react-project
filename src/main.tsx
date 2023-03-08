import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from "./Layout"

const App = lazy(() => import('./App'))
const Game = lazy(() => import('./00.Tutorial/Game'))
const QA = lazy(() => import('./ChatGPT/Components/DefaultQA'))
const NameForm = lazy(() => import('./09.Forms/NameForm'))
const Calculator = lazy(() => import('./10.LiftingStateUp/Calculator'))
const WelcomeDialog = lazy(() => import('./11.Compose/WelcomeDialog'))
const SplitPaneApp = lazy(() => import('./11.Compose/SplitPane'))
const ErrorPage = lazy(() => import('./ErrorPage'))
const Bailout = lazy(() => import('./MiniReactHook/bailout').then(module => ({ default: module.Bailout })))
const WithoutBailout = lazy(() => import('./MiniReactHook/bailout').then(module => ({ default: module.WithoutBailout })))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="/Game" element={<Game />} />
            <Route path="/default-qa" element={<QA />} />
            <Route path="/NameForm" element={<NameForm />} />
            <Route path="/Calculator" element={<Calculator />} />
            <Route path="/WelcomeDialog" element={<WelcomeDialog />} />
            <Route path="/SplitPaneApp" element={<SplitPaneApp />} />
            <Route path="/Bailout" element={<Bailout />} />
            <Route path="/WithoutBailout" element={<WithoutBailout />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>,
)

