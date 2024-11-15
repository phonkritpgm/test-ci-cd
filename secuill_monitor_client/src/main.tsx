import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/fontawesome-free-6.5.2-web/css/all.css'
import './root.css'

import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={ store }>
    <App />
  </Provider>
)
