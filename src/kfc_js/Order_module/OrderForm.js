import { Form, Select, DatePicker,message } from 'antd';
import React from 'react';
import $ from 'jquery';
// import moment from 'moment';


class OrderForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users:[],
    }
  }

  componentWillMount(){
    this.loadUser();
  }



  loadUser(){ 
    let url = "http://wangdoudou.cn:9999/user/findAll";
    $.get(url,({status,data,message:msg})=>{
        if(status === 200){
            this.setState({
                users:data,
                form:{...this.state.form,
                    ...{userId:data[0].id}
                }
            })
        } else {
            message.error(msg);
            
        }
    });
  }

  render() {
    
    const { getFieldDecorator } = this.props.form;

    const {Option} = Select;

    let {users} = this.state;

    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };

    getFieldDecorator("id");
    return (
        <div  className="order_form">
        
        <Form className="form">
         <Form.Item label="DatePicker[showTime]">
          {getFieldDecorator('orderTime', config)(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
            // <DatePicker {moment(orderTime).format('YYYY-MM-DD HH:mm:ss')} />
          )}
        </Form.Item>
        <Form.Item label="用户名">
          {getFieldDecorator("userId" , {
            rules: [{ required: true, message: 'Please select your username!' }],
          })(<Select placeholder="Select a option and change input text above" >
                {
                  users.map((item)=>{
                    return <Option key={item.id} value={item.id}>{item.name}</Option>   
                  })
                }
             </Select> )}
        </Form.Item>

        
      </Form>
        </div>
    );
  }
}

const mapPropsToFields = (props) => {
    let obj = {};
    for(let key in props.initData){
      if(key==="orderTime"){
        // let time = moment(new Date(props.initData[key])).format('YYYY-MM-DD HH:mm:ss');
        obj[key] = Form.createFormField({value: null })
      } else {
        let val = props.initData[key]; 
        obj[key] = Form.createFormField({value: val})
      }
    }
    return obj;
}

export default Form.create({
    mapPropsToFields
})(OrderForm);