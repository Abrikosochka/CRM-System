import { Route, Routes } from 'react-router'
import TodoPage from './pages/todo-page/TodoPage'
import { ProfilePage } from './pages/profile-page/ProfilePage'
import './App.css';
import { Layout } from 'antd';
import { AppHeader } from './components/header/AppHeader';
import { useAppSelector } from './hooks/reduxHooks';
import LoginPage from './pages/login-page/LoginPage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { refresh } from './api/auth-api';
import { setAccessToken } from './api/axios';
import { useAppDispatch } from './hooks/reduxHooks';
import { auth, loadingGetToken } from './store/authStore/authSlice';
import { Flex, Spin } from 'antd';
import { Navigate } from 'react-router';
import { ErrorProvider } from './hooks/useError';


const App: React.FC = () => {
  const isAuth: boolean = useAppSelector(state => state.auth.isAuth)
  const isLoading: boolean = useAppSelector(state => state.auth.isLoading)
  const isLoadingGetToken: boolean = useAppSelector(state => state.auth.isUpdateToken)
  const isAppReady = isAuth && !isLoading && !isLoadingGetToken;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      if (!isAuth) {
        dispatch(loadingGetToken(true));
        try {
          const response = await refresh(localStorage.getItem('token') || '');
          setAccessToken(response.accessToken);
          localStorage.setItem('token', response.refreshToken);
          dispatch(auth(true));
          if (location.pathname.startsWith('/auth')) {
            await navigate('/');
          }
        } catch (error) {
          console.error('Ошибка при обновлении токена:', error);
          if (!location.pathname.startsWith('/auth')) {
            navigate('/auth');
          }
        }
        dispatch(loadingGetToken(false));
      }
    }
    getToken();
  }, [])

  return (
    <ErrorProvider>
      <>
        {isAuth && <AppHeader />}
        {isLoading || isLoadingGetToken ?
          <>
            <Flex gap="middle" vertical style={{ width: '100%', height: '100vh', alignItems: "center", justifyContent: "center" }}>
              <Flex>
                <Spin tip="Loading" size="large">
                  <div style={{
                    padding: 50,
                    borderRadius: 4,
                  }} />
                </Spin>
              </Flex>
            </Flex>
          </>
          :
          <Layout className="app-layout">
            <Layout className="app-content">
              <Routes>
                <Route path='/' element={isAppReady ? <TodoPage /> : <Navigate to="/auth" replace />}></Route>
                <Route path='/profile' element={isAppReady ? <ProfilePage /> : <Navigate to="/auth" replace />}></Route>
                <Route path='/auth/*' element={!isAuth ? <LoginPage /> : <Navigate to="/" />}></Route>
              </Routes>
            </Layout>
          </Layout>
        }
      </>
    </ErrorProvider>
  )
}

export default App
