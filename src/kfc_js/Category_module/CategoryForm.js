import { Form, Input, Upload, message, Button, Icon } from 'antd';
import React from 'react';

class CategoryDetails extends React.Component {
  

  render() {
    
    const props = {
      name: 'file',
      action: 'http://134.175.154.93:8099/manager/file/upload',
      onChange:(info) => {
        if (info.file.status !== 'uploading') {
          console.log(info.file.response.data);
          // 上传附件服务器返回的数据
          let data = info.file.response.data;
          let url = "http://134.175.154.93:8888/"+data.groupname+"/"+data.id;
          //将url设置到表单中
          this.props.form.setFieldsValue({
            icon:url
          })
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const { getFieldDecorator } = this.props.form;

    getFieldDecorator("id");
    getFieldDecorator("icon");
    return (
        <div  className="ur_form">
        
        <Form className="form">
          
        <Form.Item label="种类名称">
          {getFieldDecorator("name" , {
            rules: [{ required: true, message: 'Please input name!' }],
          })( <Input placeholder="Name" /> )}
        </Form.Item>
        <Form.Item label="图片">
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 
            </Button>
          </Upload>
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
})(CategoryDetails);