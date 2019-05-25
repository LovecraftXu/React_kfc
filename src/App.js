import React from 'react';
import './App.css';
// import SiderDemo from './kfc_js/SiderDemo ';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
import Category from './kfc_js/Category';
import User from './kfc_js/User';
import Role from './kfc_js/Role';
import UR from './kfc_js/UR';
import URDetails from './kfc_js/URDetils';
import Order from './kfc_js/Order';
import Product from './kfc_js/Product';
import OrderLine from './kfc_js/OrderLine';
import { Button, Icon } from 'antd';



function App() {
  return (
    <div className="App">
      <header className="header">
      <h1>肯德基系统</h1>
      </header >
    <article className="content">
      <BrowserRouter>
      <ul className="nav">
      <Button type="primary btn" block>
          <Link to='/category' className="link">种类管理</Link>
          <Icon type="right" />
      </Button>
      <Button type="primary btn" block>
          <Link to='/user' className="link">用户管理</Link>
          <Icon type="right" />
      </Button>
      <Button type="primary btn" block>
          <Link to='/role' className="link">角色管理</Link>
          <Icon type="right" />
      </Button>
      <Button type="primary btn" block>
          <Link to='/ur' className="link">用户角色管理</Link>
          <Icon type="right" />
      </Button>
      <Button type="primary btn" block>
          <Link to='/order' className="link">订单管理</Link>
          <Icon type="right" />
      </Button>
      <Button type="primary btn" block>
          <Link to='/product' className="link">产品管理</Link>
          <Icon type="right" />
      </Button>
      <Button type="primary btn" block>
          <Link to='/orderLine' className="link">单行订单管理</Link>
          <Icon type="right" />
      </Button>
    

      </ul>
      <div className="content-right">
        <Switch>
          <Route path='/category' component={Category} />
          <Route path='/user' component={User} />
          <Route path='/role' component={Role} />
          <Route path='/ur' component={UR} />
          <Route path='/urDetails' component={URDetails} />
          <Route path='/order' component={Order} />
          <Route path='/product' component={Product} />
          <Route path='/orderLine' component={OrderLine} />
        </Switch>
      </div>
      </BrowserRouter>
    </article>
    </div>
  );
}

export default App;
