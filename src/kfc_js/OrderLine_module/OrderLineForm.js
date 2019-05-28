import { Form, Select, Input, message } from 'antd';
import React from 'react';
import $ from 'jquery';


class OrderLineForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orders:[],
      products:[]
    }
  }

  componentWillMount(){
    this.loadOrder();
    this.loadProduct();
}

   //加载
   loadOrder(){
    let url = "http://wangdoudou.cn:9999/order/findAll";
    $.get(url,({status,data,message:msg})=>{
        if(status === 200){
            this.setState({
                orders:data,
                form:{...this.state.form,
                    ...{orderId:data[0].id}
                }
            })
        } else {
          message.success(msg);
        }
    });
}
//加载
loadProduct(){
    let url = "http://wangdoudou.cn:9999/product/findAll";
    $.get(url,({status,data,message:msg})=>{
        if(status === 200){
            this.setState({
                products:data,
                form:{...this.state.form,
                    ...{productId:data[0].id}
                }
            })
        } else {
          message.success(msg);
        }
    });
}

  render() {
    const { getFieldDecorator } = this.props.form;

    const {Option} = Select;

    let {orders,products} = this.state;
    getFieldDecorator("id");
    return (
        <div  className="orderLine_form">
        
        <Form className="form">

        <Form.Item label="总订单号">
          {getFieldDecorator("orderId" , {
            rules: [{ required: true, message: 'Please select your orderId!' }],
          })(<Select placeholder="Select a option and change input text above" >
                {
                  orders.map((item)=>{
                    return <Option value={item.id}>{item.id}</Option>   
                  })
                }
             </Select> )}
        </Form.Item>
          
        <Form.Item label="产品名">
          {getFieldDecorator("productId" , {
            rules: [{ required: true, message: 'Please select your productname!' }],
          })(<Select placeholder="Select a option and change input text above" >
                {
                  products.map((item)=>{
                    return <Option value={item.id}>{item.name}</Option>   
                  })
                }
             </Select> )}
        </Form.Item>

       
        <Form.Item label="数量">
          {getFieldDecorator("num" , {
            rules: [{ required: true, message: 'Please input num!' }],
          })( <Input placeholder="Num" /> )}
        </Form.Item>
        
       
      </Form>
        </div>
    );
  }
}

const mapPropsToFields = (props) => {
    let obj = {};
    for(let key in props.initData){
        let val = props.initData[key]; 
        obj[key] = Form.createFormField({value: val})
    }
    return obj;
}

export default Form.create({
    mapPropsToFields
})(OrderLineForm);