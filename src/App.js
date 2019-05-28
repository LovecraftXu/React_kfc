import React from 'react';
import './App.css';

import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';
import { Button, Icon } from 'antd';

import Category from './kfc_js/Category_module/Category';
import CategoryDetails from './kfc_js/Category_module/CategoryDetils';
import User from './kfc_js/User_module/User';
import UserDetails from './kfc_js/User_module/UserDetils';
import Role from './kfc_js/Role_module/Role';
import RoleDetails from './kfc_js/Role_module/RoleDetils';
import UR from './kfc_js/UR_module/UR';
import URDetails from './kfc_js/UR_module/URDetails';
import Order from './kfc_js/Order_module/Order';
import OrderDetails from './kfc_js/Order_module/OrderDetails';
import Product from './kfc_js/Product_module/Product';
import ProductDetails from './kfc_js/Product_module/ProductDetails'
import OrderLine from './kfc_js/OrderLine_module/OrderLine';
import OrderLineDetails from './kfc_js/OrderLine_module/OrderLineDetails';


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
          <Route path='/categoryDetails' component={CategoryDetails} />
          <Route path='/user' component={User} />
          <Route path='/userDetails' component={UserDetails} />
          <Route path='/role' component={Role} />
          <Route path='/roleDetails' component={RoleDetails} />
          <Route path='/ur' component={UR} />
          <Route path='/urDetails' component={URDetails} />
          <Route path='/order' component={Order} />
          <Route path='/orderDetails' component={OrderDetails} />
          <Route path='/product' component={Product} />
          <Route path='/productDetails' component={ProductDetails} />
          <Route path='/orderLine' component={OrderLine} />
          <Route path='/orderLineDetails' component={OrderLineDetails} />
        </Switch>
      </div>
      </BrowserRouter>
    </article>
    </div>
  );
}

export default App;
