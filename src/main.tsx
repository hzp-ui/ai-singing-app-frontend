import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/design-tokens.css'
import './styles/global.css'
import './styles/component-styles.css'
import './styles/typography-utils.css'
import './styles/spacing-utils.css'
import './styles/shadow-utils.css'
import './styles/responsive.css'
import './index.css'
import { ConfigProvider } from 'antd-mobile'
import { ThemeProvider } from './store/ThemeContext'
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
    <ThemeProvider>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </ThemeProvider>
  </StrictMode>,
)
