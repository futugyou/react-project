import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'

// import App from './App'
// import Game from './00.Tutorial/Game'
// import NameForm from './09.Forms/NameForm'
// import Calculator from './10.LiftingStateUp/Calculator'
// import WelcomeDialog from "./11.Compose/WelcomeDialog"
// import SplitPaneApp from "./11.Compose/SplitPane"

const App = lazy(() => import('./App'))
const Game = lazy(() => import('./00.Tutorial/Game'))
const NameForm = lazy(() => import('./09.Forms/NameForm'))
const Calculator = lazy(() => import('./10.LiftingStateUp/Calculator'))
const WelcomeDialog = lazy(() => import('./11.Compose/WelcomeDialog'))
const SplitPaneApp = lazy(() => import('./11.Compose/SplitPane'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/NameForm" element={<NameForm />} />
          <Route path="/Calculator" element={<Calculator />} />
          <Route path="/WelcomeDialog" element={<WelcomeDialog />} />
          <Route path="/SplitPaneApp" element={<SplitPaneApp />} />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>,
)
