import React, { useState, useEffect } from "react"
import type { Profile } from "../../types/user.types"
import { getProfile } from "../../api/user-api"
import { Card, Layout, Result, Button } from "antd"
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner"

export const ProfilePage: React.FC = () => {

  const [userInfo, setUserInfo] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    try {
      setError(null);
      const profile: Profile = await getProfile();
      setUserInfo(profile);
    } catch {
      setError('Не удалось загрузить профиль');
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#1890ff',
      fontSize: '24px',
      height: '100vh',
      width: '100vw'
    }}>
      {error ? (
        <Result
          status="error"
          title="Ошибка"
          subTitle={error}
          extra={<Button type="primary" onClick={fetchUserInfo}>Повторить</Button>}
        />
      ) : userInfo ? (
        <Layout
          style={
            {
              background: 'none',
              width: '80%',
            }
          }
        >
          {
            <Card title="Информация о профиле"> 
                <p>ID: {userInfo.id}</p>
                <p>Имя пользователя: {userInfo.username}</p>
                <p>Email: {userInfo.email}</p>
                <p>Телефон: {userInfo.phoneNumber}</p>
            </Card>
          } 
        </Layout>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  )
}
