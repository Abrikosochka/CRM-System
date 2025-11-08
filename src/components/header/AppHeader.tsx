import { Header } from 'antd/es/layout/layout';
import './header.css'
import { HeaderMenu } from './header-menu/HeaderMenu';

export const AppHeader: React.FC = () => {
  return (
    <>
      <Header className='header'>
        <h1>
          ToDo
        </h1>
        <HeaderMenu />
      </Header>
    </>
  )
}
