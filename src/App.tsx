import { Route, Routes } from 'react-router'
import TodosPage from './pages/todo-page/TodoPage'
import { ProfilePage } from './pages/profile-page/ProfilePage'
import './App.css';
import Layout from 'antd/es/layout/layout';
import { AppHeader } from './components/header/Header';

function App() {


  return (
    <>
      <AppHeader />
      <Layout className="app-layout">
        <Layout className="app-content">
          <Routes>
            <Route path='/' element={<TodosPage />}></Route>
            <Route path='/profile' element={<ProfilePage />}></Route>
          </Routes>
        </Layout>
      </Layout>
    </>
  )
}

export default App
