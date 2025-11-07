import { Header } from 'antd/es/layout/layout';
import './header.css'
import { HeaderMenu } from './header-menu/HeaderMenu';


export const AppHeader: React.FC = () => {


  return (
    <>
      <Header className='header'>
        <h2>
          ToDo
        </h2>
        <HeaderMenu />
      </Header>
    </>
  )
}
