import React from "react"
import type { Profile } from "../../types/user.types"
import { getProrile } from "../../api/user-api"
import { useEffect } from "react"
import { Card, Flex, Layout, Spin } from "antd"

export const ProfilePage: React.FC = () => {

  const [userInfo, setUserInfo] = React.useState<Profile | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const profile: Profile = await getProrile();
        setUserInfo(profile);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    }
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
      {userInfo ?
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
      </Layout> : 
        <>
          <Flex gap="middle" vertical style={{ width: '100%', height: '100vh', alignItems: "center", justifyContent: "center" }}>
            <Flex>
              <Spin tip="Loading" size="large">
                {<div style={{
                  padding: '50px',
                  borderRadius: '4px',
                  }
                } />}
              </Spin>
            </Flex>
          </Flex>
        </>}
    </div>
  )
}
