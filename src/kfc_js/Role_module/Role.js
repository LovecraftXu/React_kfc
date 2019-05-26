import React from 'react';
import $ from 'jquery';
import { Button, Table, Divider, Icon, Modal, message } from 'antd';
import '../Kfc.css';
import RoleForm from './RoleForm';

class Role extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            visible:false,
            ids:[],
            roles:[],
            obj:{},
            loading:true
            
        }
    }

    componentWillMount(){
        this.loadRole();
    }

    //加载
    loadRole(){
        let url = "http://wangdoudou.cn:9999/role/findAll";
        $.get(url,({status,data,message:msg})=>{
            if(status === 200){
                this.setState({
                    roles:data,
                    loading:false
                })
            } else {
                message.success(msg);
            }
        });
    }

     //点击添加执行函数
     toAdd = () => {
        this.setState({
            visible: true, 
            obj:{}
        });
    }

    //提交
    handleOk = e => {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            let url = "http://wangdoudou.cn:9999/role/saveOrUpdate";
            $.post(url,values,({status,message:msg})=>{
                if(status === 200){
                    message.success(msg);
                    this.closeModal();
                    this.loadRole();
                } else {
                    message.error(msg);
                }
            })
            
          } 
        });    
    }

    //查看详细信息
    toDetails(record){
        this.props.history.push({
            pathname:'/roleDetails',
            state:record
        });
    }
    
    //点击修改执行函数
    toEdit = (record) =>{
        this.setState({
            visible: true,
            obj:record,
        });
    }

    //点击删除按钮后执行
    toDelete = (id) => {
        Modal.confirm({
          title: '是否确定删除本行?',
          content: 'Some descriptions',
          okText: '是',
          okType: 'danger',
          cancelText: '否',
          onOk:() => {
            let url ="http://wangdoudou.cn:9999/role/deleteById?id="+id;
            $.get(url,({status,message:msg}) =>{
            if(status === 200){
                message.success(msg);
                this.loadRole();
            } else {
                message.error(msg);
            }
             })    
        },
          onCancel() {
            
          },
        });
    }

    //点击批量删除按钮后执行
    batchDeleteByIds(){
        Modal.confirm({
            title: '是否确定批量删除数据?',
            content: 'Some descriptions',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk:() => {
              let url = "http://wangdoudou.cn:9999/role/deleteBatchByIds";
          $.ajax({
              url:url,
              method:'POST',
              processData:false,
              contentType:'application/json',
              data:JSON.stringify(this.state.ids),
              success:({status,message:msg}) =>{
                  if(status === 200){
                      message.success(msg);
                      this.loadRole();
                  } else {
                      message.error(msg);
                  }
              } 
          });
          },
            onCancel() {
              
            },
          });
    }

    //点击取消
   handleCancel = e => {
    this.closeModal();
    };

    //关闭模态框
    closeModal(){
        this.setState({visible: false, });
    }
    //ref函数
    FormRefs = (form) =>{
        this.form = form;
    }

    render(){
        let {roles} = this.state;
        let { Column } = Table;
        var rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({ids:selectedRowKeys});
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
              }),
          };
        //分页配置
        let pagination = {
            position:'bottom',
            pageSize:5,
            
        }
        return (
            <div className="role">
                <h2>角色管理</h2>
                <div class="btns">
                    <Button type="primary" className="btn" onClick={this.toAdd.bind(this)}>添加</Button>
                    <Button type="danger" className="btn" onClick = {this.batchDeleteByIds.bind(this)}>批量下架</Button>
                </div>
                
               {/* 模态框 */}
               <Modal
                    title="添加"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <RoleForm initData={this.state.obj} ref={this.FormRefs} />
                </Modal>

                <Table rowKey="id"  
                dataSource={roles} 
                bordered={true} 
                rowSelection={rowSelection} 
                size="small" 
                pagination={pagination} 
                loading={this.state.loading}>
                    <Column align="center" title="角色权限名称" dataIndex="name" key="name" />
                    
                    <Column align="center"
                    title="操作"
                    key="action"
                    render={(text, record) => (
                        <span>
                        <Icon type="delete" onClick={this.toDelete.bind(this,record.id)}></Icon>
                        <Divider type="vertical" />
                        <Icon type="edit"  onClick = {this.toEdit.bind(this,record)}></Icon>
                        <Divider type="vertical" />
                        <Icon type="eye" onClick={this.toDetails.bind(this,record)}></Icon>
                        </span>
                    )}
                    />
                </Table>
            </div>
        )
    }
}




export default Role;