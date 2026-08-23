import { useNavigate, type NavigateFunction } from 'react-router';
import {
  ProfileOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu, Layout } from 'antd';
import React, { useRef, useState } from 'react';
import './sideMenu.css';
import { useAppDispatch } from '../../../store/reduxHooks';
import { auth } from '../../../store/authStore/authSlice.ts';
import { performLogout } from '../../../api/userApi.ts';

export const SideMenu: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const mobileButton = useRef<HTMLButtonElement>(null);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await performLogout();
      localStorage.removeItem('token');
      dispatch(auth(false));
      navigate('/auth');
    } catch {
      localStorage.removeItem('token');
      dispatch(auth(false));
      navigate('/auth');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const collapseMenu = (): void => {
    setCollapsed(true);
  };

  const expandMenu = (): void => {
    setCollapsed(false);
  };

  const items: Required<MenuProps>['items'][number][] = [
    {
      key: '1',
      icon: <ProfileOutlined />,
      label: 'Список задач',
      onClick: () => {
        navigate('/');
      },
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'Профиль',
      onClick: () => {
        navigate('/profile');
      },
    },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: 'Выйти',
      onClick: () => handleLogout(),
      danger: true,
    },
  ];

  const toggleMobileMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        ref={mobileButton}
        className="mobile_menu-button"
        type="primary"
        onClick={toggleMobileMenu}
        style={{ marginBottom: 16 }}
      >
        {isOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Layout className={`app-menu_layout ${isOpen ? 'mobile_menu-visible' : ' '}`}>
        <Menu
          className="app-menu"
          defaultSelectedKeys={[document.location.pathname === '/profile' ? '2' : '1']}
          mode="inline"
          inlineCollapsed={mobileButton.current?.offsetParent ? !isOpen : collapsed}
          onMouseEnter={expandMenu}
          onMouseLeave={collapseMenu}
          items={items}
        />
      </Layout>
    </>
  );
};
