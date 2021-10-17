import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import HomeWrapper from '../../home';
import LaunchesWrapper from '../../launches';
import RocketsWrapper from '../../rockets';
import NoMatch from '../../nomatch/components/nomatch';
import UserWrapper from '../../users';
import BreadCrumb from '../../../components/breadcrumb';
import '../nav.css';

const { Header, Content, Footer } = Layout;

const Navbar = () => {
  let current = localStorage.getItem('routes');
  let currentKey;
  switch (current) {
    case '':
      currentKey = '1';
      break;
    case 'launches':
      currentKey = '2';
      break;
    case 'rockets':
      currentKey = '3';
      break;
    case 'users':
      currentKey = '4';
      break;

    default:
      break;
  }

  return (
    <>
      <Layout className='layout'>
        <Router>
          <Header className='header'>
            <Menu
              theme='dark'
              mode='horizontal'
              defaultSelectedKeys={[currentKey]}
            >
              <Menu.Item key='1'>
                <Link to='/'>HOME</Link>
              </Menu.Item>
              <Menu.Item key='2'>
                <Link to='/launches'>Launches</Link>
              </Menu.Item>
              <Menu.Item key='3'>
                <Link to='/rockets'>Rockets</Link>
              </Menu.Item>
              <Menu.Item key='4'>
                <Link to='/users'>Users</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content className='site-layout content'>
            <BreadCrumb />

            <div className='site-layout-content content-div'>
              <Switch>
                <Route exact path='/' component={HomeWrapper}></Route>
                <Route
                  exact
                  path='/upcominglaunches/:id'
                  component={HomeWrapper}
                ></Route>
                <Route
                  exact
                  path='/launches'
                  component={LaunchesWrapper}
                ></Route>
                <Route
                  exact
                  path='/launches/:id'
                  component={LaunchesWrapper}
                ></Route>
                <Route exact path='/rockets' component={RocketsWrapper}></Route>
                <Route
                  exact
                  path='/rockets/:id'
                  component={RocketsWrapper}
                ></Route>
                <Route exact path='/users' component={UserWrapper}></Route>
                <Route
                  exact
                  path='/users/:id/edit'
                  component={UserWrapper}
                ></Route>
                <Route
                  exact
                  path='/users/create'
                  component={UserWrapper}
                ></Route>
                <Route path='*' component={NoMatch}></Route>
              </Switch>
            </div>
          </Content>
          <Footer></Footer>
        </Router>
      </Layout>
    </>
  );
};

export default Navbar;
