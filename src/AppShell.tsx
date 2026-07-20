import { Navigate, Route, Routes } from 'react-router-dom'
import App from './App'
import { DemoPage } from './components/DemoPage'

export function AppShell() {
  return (
    <Routes>
      <Route path="/" element={<DemoPage />} />
      <Route path="/app" element={<App />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
