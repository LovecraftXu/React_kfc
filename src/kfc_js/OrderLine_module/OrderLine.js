import React from 'react';
import $ from 'jquery';
import { Button, Table, Divider, Icon, Modal, message } from 'antd';
import '../Kfc.css';
import OrderLineForm from './OrderLineForm';

class OrderLine extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            visible:false,
            ids:[],
            orderLines:[],
            obj:{},
            loading:true
        }
    }

    componentWillMount(){
        this.loadOrderLine();
    }

    //加载
    loadOrderLine(){
        let url = "http://wangdoudou.cn:9999/ol/findAllWithOrderProduct";
        $.get(url,({status,data,message:msg})=>{
            if(status === 200){
                this.setState({
                    orderLines:data,
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
            let url = "http://wangdoudou.cn:9999/ol/saveOrUpdate";
            $.post(url,values,({status,message:msg})=>{
                if(status === 200){
                    message.success(msg);
                    this.closeModal();
                    this.loadOrderLine();
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
            pathname:'/orderLineDetails',
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
            let url ="http://wangdoudou.cn:9999/ol/deleteById?id="+id;
            $.get(url,({status,message:msg}) =>{
            if(status === 200){
                message.success(msg);
                this.loadOrderLine();
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
              let url = "http://wangdoudou.cn:9999/ol/deleteBatchByIds";
          $.ajax({
              url:url,
              method:'POST',
              processData:false,
              contentType:'application/json',
              data:JSON.stringify(this.state.ids),
              success:({status,message:msg}) =>{
                  if(status === 200){
                      message.success(msg);
                      this.loadOrderLine();
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

    //时间戳转日期  没有时间默认为1970-01-1 8:0:0
    timestampToTime(timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000    
        let Y = date.getFullYear() + '-';      
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';      
        let D = date.getDate() + ' ';     
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
         return Y+M+D+h+m+s;
        }

    render(){
        let {orderLines} = this.state;
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

        let pagination = {
            position:'bottom',
            pageSize:5,
        }
        return (
            <div className="orderLine">
                <h2>单行订单管理</h2>
                <div className="btns">
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
                    <OrderLineForm initData={this.state.obj} ref={this.FormRefs} />
                </Modal>

                <Table  rowKey="id" dataSource={orderLines} bOrderLineed={true} rowSelection={rowSelection} size="small" pagination={pagination} loading={this.state.loading}>
                   
                    <Column align="center" title="数量" dataIndex="num" key="num" />
                    <Column align="center" title="产品名称" key="product" render={(record) => (
                        <span>
                        {record.product.name}
                        </span>
                    )} />
                    <Column align="center" title="订单时间" key="order" render={(record) => (
                        <span>
                        {this.timestampToTime(record.order.orderTime)}
                        </span>
                    )} />
                    <Column align="center"
                    title="操作"
                    key="action"
                    width="400px"
                    render={(record) => (
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




export default OrderLine;