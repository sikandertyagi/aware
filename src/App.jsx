import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import ModulePage from './components/ModulePage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/module/:moduleId" element={<ModulePage />} />
      </Route>
    </Routes>
  )
}

export default App
