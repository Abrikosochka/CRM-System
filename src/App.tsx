import { Route, Routes, useNavigate, type NavigateFunction } from 'react-router'
import { useRef, useState } from 'react'
import TodosPage from './pages/TodoPage'
import { ProfilePage } from './pages/ProfilePage'
import './app.css';
import Layout from 'antd/es/layout/layout';
import {
  ProfileOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';


function App() {
  const navigate: NavigateFunction = useNavigate()

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const mobileButton = useRef<HTMLButtonElement>(null);

  const openMenu = (): void => {
    setCollapsed(true);
  };

  const closeMenu = (): void => {
    setCollapsed(false);
  };

  const items: Required<MenuProps>['items'][number][] = [
    { key: '1', icon: <ProfileOutlined />, label: 'Список задач', onClick: () => { navigate('/') } },
    { key: '2', icon: <UserOutlined />, label: 'Профиль', onClick: () => { navigate('/profile') } }
  ];

  const openMobileMenu = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Header className='header'>
        <h2>
          ToDo
        </h2>
        <Button ref={mobileButton} className='mobile_menu-button' type="primary" onClick={openMobileMenu} style={{ marginBottom: 16 }}>
          {isOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Layout className={`app-menu_layout ${isOpen ? "mobile_menu-visible" : " "}`} >
          <Menu className="app-menu"
            defaultSelectedKeys={[document.location.pathname === '/profile' ? '2' : '1']}
            mode="inline"
            inlineCollapsed={mobileButton.current?.offsetParent ? !isOpen : collapsed}
            onMouseEnter={closeMenu}
            onMouseLeave={openMenu}
            items={items}
          />
        </Layout>
      </Header>

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
