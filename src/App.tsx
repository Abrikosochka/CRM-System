import { BrowserRouter, Route, Routes } from 'react-router'
import TodosPage from './pages/TodoPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TodosPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
