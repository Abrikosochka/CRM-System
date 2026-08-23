import { Header } from 'antd/es/layout/layout';
import './header.css';
import { SideMenu } from './sideMenu/SideMenu';

export const AppHeader: React.FC = () => {
  return (
    <Header className="header">
      <h1>ToDo</h1>
      <SideMenu />
    </Header>
  );
};
