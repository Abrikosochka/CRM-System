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
import { Navigate } from 'react-router';
import { ErrorProvider } from './hooks/ErrorProvider';
import { LoadingSpinner } from './components/loading-spinner/LoadingSpinner';


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
        } catch {
          if (!location.pathname.startsWith('/auth')) {
            navigate('/auth');
          }
        }
        dispatch(loadingGetToken(false));
      }
    }
    getToken();
  }, [dispatch, isAuth, navigate])

  return (
    <ErrorProvider>
      <>
        {isAuth && <AppHeader />}
        {isLoading || isLoadingGetToken ?
          <LoadingSpinner />
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
