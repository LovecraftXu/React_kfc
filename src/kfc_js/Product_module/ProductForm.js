import { Form, Select, message, Input } from 'antd';
import React from 'react';
import $ from 'jquery';


class ProductForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories:[],
    }
  }

  componentWillMount(){
    this.loadCategory();
  }

  //加载
  loadCategory(){
    let url = "http://wangdoudou.cn:9999/category/findAll";
    $.get(url,({status,data,message:msg})=>{
        if(status === 200){
            this.setState({
                categories:data,
                form:{...this.state.form,
                    ...{categoryId:data[0].id}
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

    let {categories} = this.state;

    getFieldDecorator("id");
    return (
        <div  className="ur_form">
        
        <Form className="form">
        <Form.Item label="产品名称">
          {getFieldDecorator("name" , {
            rules: [{ required: true, message: 'Please input name!' }],
          })( <Input placeholder="Name" /> )}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator("description" , {
            rules: [{ required: true, message: 'Please input description!' }],
          })( <Input placeholder="Description" /> )}
        </Form.Item>
        <Form.Item label="价格">
          {getFieldDecorator("price" , {
            rules: [{ required: true, message: 'Please input price!' }],
          })( <Input placeholder="Price" /> )}
        </Form.Item>
        <Form.Item label="销量">
          {getFieldDecorator("xiaoliang" , {
            rules: [{ required: true, message: 'Please input xiaoliang!' }],
          })( <Input placeholder="XiaoLiang" /> )}
        </Form.Item>

        <Form.Item label="种类名">
          {getFieldDecorator("categoryId" , {
            rules: [{ required: true, message: 'Please select your categoryname!' }],
          })(<Select placeholder="Select a option and change input text above" >
                {
                  categories.map((item)=>{
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
  // alert(JSON.stringify(props.initData))
    let obj = {};
    for(let key in props.initData){
        let val = props.initData[key]; 
        obj[key] = Form.createFormField({value: val})
    }
    return obj;
}

export default Form.create({
    mapPropsToFields
})(ProductForm);