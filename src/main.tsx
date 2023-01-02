import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Game from './00.Tutorial/Game'
import NameForm from './09.Forms/NameForm'
import Calculator from './10.LiftingStateUp/Calculator'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <NameForm />
    <Game />
    <Calculator />
  </React.StrictMode>,
)
