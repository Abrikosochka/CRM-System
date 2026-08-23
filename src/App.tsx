import { Route, Routes, Navigate, useNavigate } from 'react-router';
import TodoPage from './pages/todoPage/TodoPage';
import { ProfilePage } from './pages/profilePage/ProfilePage';
import './App.css';
import { Layout } from 'antd';
import { AppHeader } from './components/header/AppHeader';
import { useAppSelector, useAppDispatch } from './store/reduxHooks';
import LoginPage from './pages/loginPage/LoginPage';
import { useEffect } from 'react';
import { refreshAccessToken } from './api/authApi.ts';
import { setAccessToken } from './api/tokenService';
import { auth, setIsUpdateToken } from './store/authStore/authSlice';
import { ErrorProvider } from './hooks/ErrorProvider';
import { LoadingSpinner } from './components/loadingSpinner/LoadingSpinner';

const App: React.FC = () => {
  const isAuth: boolean = useAppSelector((state) => state.auth.isAuth);
  const isLoading: boolean = useAppSelector((state) => state.auth.isLoading);
  const isLoadingGetToken: boolean = useAppSelector((state) => state.auth.isUpdateToken);
  const isAppReady = isAuth && !isLoading && !isLoadingGetToken;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const restoreSession = async () => {
      if (!isAuth) {
        dispatch(setIsUpdateToken(true));
        try {
          const storedRefreshToken = localStorage.getItem('token') || '';
          const response = await refreshAccessToken(storedRefreshToken);
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
        dispatch(setIsUpdateToken(false));
      }
    };
    restoreSession();
  }, [dispatch, isAuth, navigate]);

  return (
    <ErrorProvider>
      <>
        {isAuth && <AppHeader />}
        {isLoading || isLoadingGetToken ? (
          <LoadingSpinner />
        ) : (
          <Layout className="app-layout">
            <Layout className="app-content">
              <Routes>
                <Route
                  path="/"
                  element={isAppReady ? <TodoPage /> : <Navigate to="/auth" replace />}
                />
                <Route
                  path="/profile"
                  element={isAppReady ? <ProfilePage /> : <Navigate to="/auth" replace />}
                />
                <Route
                  path="/auth/*"
                  element={!isAuth ? <LoginPage /> : <Navigate to="/" />}
                />
              </Routes>
            </Layout>
          </Layout>
        )}
      </>
    </ErrorProvider>
  );
};

export default App;
