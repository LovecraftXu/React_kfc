import React from 'react';
import $ from 'jquery';
import { Button, Table, Divider } from 'antd';
import './Kfc.css';
class User extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            arr:[],
            users:[],
            form:{
                id:'',
                name:'',
                telephone:'',
                photo:''
            }
        }
    }

    componentWillMount(){
        this.loadUser();
    }

    //加载
    loadUser(){
        let url = "http://wangdoudou.cn:9999/user/findAll";
        $.get(url,({status,data,message})=>{
            if(status === 200){
                this.setState({
                    users:data
                })
            } else {
                alert(message);
            }
        });
    }

    //显示框
    displayHandler(){
        $('.hidden').css('display','block');
    }

    //将input的状态隐射到组件state中
    changeHandlar = (event)=>{
        let name = event.target.name;
        let val = event.target.value;
        this.setState({
            form:{...this.state.form,...{[name]:val}}
        })
    }
    //提交
    submitForm = (event)=>{
        let url = "http://wangdoudou.cn:9999/user/saveOrUpdate";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.setState({
                form:{
                    id:'',
                    name:'',
                    telephone:'',
                    photo:''
                }
            })
            $('.hidden').css('display','none');
            this.loadUser();
        })
        event.preventDefault();
    };

    //删除
    deleteUserHandler(id){
        this.deleteUserById(id,({status,message}) =>{
            if(status === 200){
                alert(message);
                this.loadUser();
            } else {
                alert(message);
            }
        })
    }
    deleteUserById(id,handler){
        let url ="http://wangdoudou.cn:9999/user/deleteById?id="+id;
        $.get(url,function(result){
            handler(result);
        })   
    }

    //更改
    updateUserHandler(id){
        this.findUserById(id,({status,message,data}) =>{
            if(status === 200){
                alert(JSON.stringify(data));
                this.setState({
                    form:data
                })
                $('.hidden').css('display','block');
            } else {
                alert(message);
            }
        })
    }
    findUserById(id,handler){
        let url = "http://wangdoudou.cn:9999/user/findById?id="+id;
        $.get(url,function(result){
            handler(result);
        })
    }

    //批量删除
    bacthDeleteHandler(arr){
        // alert(this.state.arr);
        arr = this.state.arr;
        this.batchDeleteByIds(arr,({status,message}) =>{
            if(status === 200){
                alert(message);
                this.loadUser();
            } else {
                alert(message);
            }
        })    
    }
    batchDeleteByIds(arr,handler){
        let url = "http://wangdoudou.cn:9999/user/deleteBatchByIds";
        $.ajax({
            url:url,
            method:'POST',
            processData:false,
            contentType:'application/json',
            data:JSON.stringify(arr),
            success:function(result){
                handler(result);
            }
        });
    }
    

    render(){
        let { form,users} = this.state;
        let { Column } = Table;
        // let { getFieldDecorator } = this.props.form;
        var rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              var arrNew = [];
                for(let i in selectedRows){
                   arrNew.push(selectedRows[i].id);
                   console.log(arrNew);   
                }
                this.setState({
                    arr:arrNew
                })
                console.log("this.state.arr="+this.state.arr);     
            }
          };
          
        return (
            <div className="user">
                <h2>用户管理</h2>
                <div class="btns">
                    <Button type="primary" className="btn" onClick={this.displayHandler}>添加</Button>
                    
                    <Button type="danger" className="btn" onClick = {this.bacthDeleteHandler.bind(this,this.state.arr)}>批量下架</Button>
                </div>
                
                {/* 表单 */}
                {JSON.stringify(form)}

                <form className="hidden" onSubmit={this.submitForm}>
                    <input type="text" name="id" hidden="hidden" />
                    姓名&nbsp;&nbsp;&nbsp;
                    <input type="text" name="name" required="true" placeholder="请输入姓名!" value={form.name}  onChange={this.changeHandlar}/>  
                    电话号&nbsp;&nbsp;&nbsp;
                    <input type="text" name="telephone" required="true" placeholder="请输入手机号!" value={form.telephone}  onChange={this.changeHandlar}/>   
                    图片&nbsp;&nbsp;&nbsp;
                    <input type="text" name="photo" required="true" placeholder="请输入图片地址!" value={form.photo} onChange={this.changeHandlar}/>  
                    <button className="primary">提交</button>
                </form>

                <Table dataSource={users} bordered={true} rowSelection={rowSelection}>
                    <Column align="center" title="类型名称" dataIndex="name" key="name" />
                    <Column align="center" title="手机号" dataIndex="telephone" key="telephone" />
                    <Column align="center" title="图片" dataIndex="photo" key="photo" />
                    <Column align="center"
                    title="操作"
                    key="action"
                    render={(text, record) => (
                        <span>
                        <Button onClick= {this.deleteUserHandler.bind(this,record.id)}>删除</Button>
                        <Divider type="vertical" />
                        <Button onClick = {this.updateUserHandler.bind(this,record.id)}>更改</Button>
                        </span>
                    )}
                    />
                </Table>
            </div>
        )
    }
}




export default User;