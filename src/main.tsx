import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/design-tokens.css'
import './index.css'
import { ConfigProvider } from 'antd-mobile'
import App from './App.tsx'

// Ant Design Mobile 主题配置
const theme = {
  '--adm-color-primary': '#FF8C00',
  '--adm-color-success': '#22C55E',
  '--adm-color-danger': '#EF4444',
  '--adm-font-size': '18px',
  '--adm-border-radius': '16px',
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
