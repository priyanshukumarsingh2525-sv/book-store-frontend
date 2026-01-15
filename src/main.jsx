import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import 'sweetalert2/dist/sweetalert2.js'
import router from './Routers/router.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
