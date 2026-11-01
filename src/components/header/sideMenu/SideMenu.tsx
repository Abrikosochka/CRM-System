import { useLocation, useNavigate, type NavigateFunction } from "react-router";
import {
  ProfileOutlined,
  UserOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu, Layout } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./sideMenu.css";
import { useAppDispatch } from "../../../store/reduxHooks";
import { auth } from "../../../store/authStore/authSlice.ts";
import { performLogout } from "../../../api/userApi.ts";
import { setAccessToken } from "../../../api/tokenService.ts";
import { getProfile } from "../../../api/userApi.ts";

export const SideMenu: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const mobileButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkAdminRole = async (): Promise<void> => {
      try {
        const profile = await getProfile();
        setIsAdmin(profile.roles.includes("admin"));
      } catch {
        setIsAdmin(false);
      }
    };

    checkAdminRole();
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    const completeLogout = () => {
      setAccessToken(null);
      localStorage.removeItem("token");
      dispatch(auth(false));
      navigate("/auth");
    };

    setIsLoggingOut(true);
    const refreshToken = localStorage.getItem("token");

    try {
      if (refreshToken && refreshToken !== "undefined") {
        await performLogout(refreshToken);
      }
      completeLogout();
    } catch {
      completeLogout();
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

  const items: Required<MenuProps>["items"][number][] = [
    {
      key: "1",
      icon: <ProfileOutlined />,
      label: "Список задач",
      onClick: () => {
        navigate("/");
      },
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Профиль",
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: "Выйти",
      onClick: () => handleLogout(),
      danger: true,
    },
  ];

  if (isAdmin) {
    items.splice(1, 0, {
      key: "2",
      icon: <TeamOutlined />,
      label: "Пользователи",
      onClick: () => {
        navigate("/users");
      },
    });
  }

  const selectedKey = location.pathname.startsWith("/users")
    ? "2"
    : location.pathname === "/profile"
      ? "3"
      : "1";

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
      <Layout
        className={`app-menu_layout ${isOpen ? "mobile_menu-visible" : " "}`}
      >
        <Menu
          className="app-menu"
          selectedKeys={[selectedKey]}
          mode="inline"
          inlineCollapsed={
            mobileButton.current?.offsetParent ? !isOpen : collapsed
          }
          onMouseEnter={expandMenu}
          onMouseLeave={collapseMenu}
          items={items}
        />
      </Layout>
    </>
  );
};
