// Here we include the components which need to be accesses after successful login.
import { useState } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {
  HomeOutlined,
  FileOutlined,
  UserOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import routes from './routes';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const visible = false

function ProtectedRoutes() {
  const [visible, setVisible] = useState(false)

  const toggleMenu = () => {
    setVisible(!visible)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={visible} >
        <div className="logo">
          <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flofrev.net%2Fwp-content%2Fphotos%2F2017%2F05%2Fgoogle_color_logo.png&f=1&nofb=1" style={{ width: '100%' }} />
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <NavLink to="/dashboard">
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <NavLink to="/users">
              Users
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<OrderedListOutlined />}>
            <NavLink to="/products" activeStyle={{ color: '#fff' }}>
              Products
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button
            value="large"
            onClick={toggleMenu}
            icon={!visible ? <MenuFoldOutlined /> :<MenuUnfoldOutlined /> }
            style={{ marginLeft: 20 }}
          />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Switch>
            {routes.map(({ component: Component, path, exact }, index) => (
              <Route path={`/${path}`} key={index} exact={exact}>
                <Component />
              </Route>
            ))}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>IFL 2021</Footer>
      </Layout>
    </Layout>
  );
}

export default ProtectedRoutes;
