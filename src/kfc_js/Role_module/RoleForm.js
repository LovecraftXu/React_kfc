import { Form, Input} from 'antd';
import React from 'react';

class RoleForm extends React.Component {
  

  render() {

    const { getFieldDecorator } = this.props.form;

    getFieldDecorator("id");
    getFieldDecorator("icon");
    return (
        <div  className="ur_form">
        
        <Form className="form">
        <Form.Item label="种类名称">
          {getFieldDecorator("name" , {
            rules: [{ required: true, message: 'Please select name!' }],
          })( <Input placeholder="Name" /> )}
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
})(RoleForm);