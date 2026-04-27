import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import {AppProvider} from "./context/AppContext"
import { ToastContainer } from 'react-toastify';

export const serverUrl = "http://localhost:3000"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppProvider>
    <App />
  </AppProvider>
  <ToastContainer />
  </BrowserRouter>
)
