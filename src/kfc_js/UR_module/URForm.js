import { Form, Select } from 'antd';
import React from 'react';
import $ from 'jquery';


class URForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users:[],
      roles:[]
    }
  }

  componentWillMount(){
    this.loadRole();
    this.loadUser();
}



  loadUser(){ 
    let url = "http://wangdoudou.cn:9999/user/findAll";
    $.get(url,({status,data,message})=>{
        if(status === 200){
            this.setState({
                users:data,
                form:{...this.state.form,
                    ...{userId:data[0].id}
                }
            })
        } else {
            message.error(message);
            
        }
    });
}
//加载
loadRole(){
    let url = "http://wangdoudou.cn:9999/role/findAll";
    $.get(url,({status,data,message})=>{
        if(status === 200){
            this.setState({
                roles:data,
                form:{...this.state.form,
                    ...{roleId:data[0].id}
                }
            })
        } else {
            alert(message);
        }
    });
}


  render() {
    
    // const props = {
    //   name: 'file',
    //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //   headers: {
    //     authorization: 'authorization-text',
    //   },
    //   onChange(info) {
    //     if (info.file.status !== 'uploading') {
    //       console.log(info.file, info.fileList);
    //       // let response = info.file.response.date;
    //       // let url = "http://134.175.154.93:8888/"+response.group
    //     }
    //     if (info.file.status === 'done') {
    //       message.success(`${info.file.name} file uploaded successfully`);
    //     } else if (info.file.status === 'error') {
    //       message.error(`${info.file.name} file upload failed.`);
    //     }
    //   },
    // };

    const { getFieldDecorator } = this.props.form;

    const {Option} = Select;

    let {users,roles} = this.state;
    getFieldDecorator("id");
    return (
        <div  className="ur_form">
        
        <Form className="form">
        <Form.Item label="用户名">
          {getFieldDecorator("userId" , {
            rules: [{ required: true, message: 'Please select your username!' }],
          })(<Select placeholder="Select a option and change input text above" >
                {
                  users.map((item)=>{
                    return <Option value={item.id}>{item.name}</Option>   
                  })
                }
             </Select> )}
        </Form.Item>
        <Form.Item label="角色名">
          {getFieldDecorator('roleId', {
            rules: [{ required: true, message: 'Please input your rolename!' }],
          })( <Select placeholder="Select a option and change input text above" >
                {
                  roles.map((item)=>{
                    return <Option value={item.id}>{item.name}</Option>   
                  })
                }
       </Select> )}
        </Form.Item>
        {/* <Form.Item label="头像">
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 
            </Button>
          </Upload>
        </Form.Item> */}
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
})(URForm);