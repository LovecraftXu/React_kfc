import React from 'react';
import $ from 'jquery';
import { Button, Table, Divider } from 'antd';
import './Kfc.css';

class OrderLine extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            arr:[],
            orders:[],
            orderLines:[],
            products:[],
            form:{
                id:'',
                num:'',
                orderId:'',
                productId:''
            }
        }
    }

    componentWillMount(){
        this.loadOrderLine();
        this.loadOrder();
        this.loadProduct();
    }

    //加载
    loadOrderLine(){
        let url = "http://wangdoudou.cn:9999/ol/findAllWithOrderProduct";
        $.get(url,({status,data,message})=>{
            if(status === 200){
                this.setState({
                    orderLines:data  
                })
            } else {
                alert(message);
            }
        });
    }
    //加载
    loadOrder(){
        let url = "http://wangdoudou.cn:9999/order/findAll";
        $.get(url,({status,data,message})=>{
            if(status === 200){
                this.setState({
                    orders:data,
                    form:{...this.state.form,
                        ...{orderId:data[0].id}
                    }
                })
            } else {
                alert(message);
            }
        });
    }
    //加载
    loadProduct(){
        let url = "http://wangdoudou.cn:9999/product/findAll";
        $.get(url,({status,data,message})=>{
            if(status === 200){
                this.setState({
                    products:data,
                    form:{...this.state.form,
                        ...{productId:data[0].id}
                    }
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
        let url = "http://wangdoudou.cn:9999/ol/saveOrUpdate";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.setState({
                form:{
                    id:'',
                    num:'',
                    orderId:'',
                    productId:''
                }
            })
            $('.hidden').css('display','none');
            this.loadOrderLine();
            this.loadOrder();
            this.loadProduct();
        })
        event.preventDefault();
    };

    //删除
    deleteOrderLineHandler(id){
        this.deleteOrderLineById(id,({status,message}) =>{
            if(status === 200){
                alert(message);
                this.loadOrderLine();
            } else {
                alert(message);
            }
        })
    }
    deleteOrderLineById(id,handler){
        let url ="http://wangdoudou.cn:9999/ol/deleteById?id="+id;
        $.get(url,function(result){
            handler(result);
        })   
    }

    //更改
    updateOrderLineHandler(id){
        this.findOrderLineById(id,({status,message,data}) =>{
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
    findOrderLineById(id,handler){
        let url = "http://wangdoudou.cn:9999/ol/findById?id="+id;
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
                this.loadOrderLine();
            } else {
                alert(message);
            }
        })    
    }
    batchDeleteByIds(arr,handler){
        let url = "http://wangdoudou.cn:9999/ol/deleteBatchByIds";
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
        let {form,orderLines,orders,products} = this.state;
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
            <div className="orderLine">
                <h2>单行订单管理</h2>
                <div class="btns">
                    <Button type="primary" className="btn" onClick={this.displayHandler}>添加</Button>
                    <Button type="danger" className="btn" onClick = {this.bacthDeleteHandler.bind(this,this.state.arr)}>批量下架</Button>
                </div>
                
                {/* 表单 */}
                {JSON.stringify(form)}

                <form className="hidden" onSubmit={this.submitForm}>
                    <input type="text" name="id" hidden="hidden" />
                    数量&nbsp;&nbsp;&nbsp;
                    <input type="text" name="num" required="true" placeholder="请输入数量!" value={form.num} onChange={this.changeHandlar}/>
                    订单编号&nbsp;&nbsp;&nbsp;
                    <select name="orderId" value={form.orderId} onChange={this.changeHandlar}>
                        {
                            orders.map((item)=>{
                                return <option key={item.id} value={item.id}>{item.id}</option>
                            })
                        }
                    </select>  
                    产品名称&nbsp;&nbsp;&nbsp;
                    <select name="productId" value={form.productId} onChange={this.changeHandlar}>
                        {
                            products.map((item)=>{
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        } 
                    </select>
                    <button className="primary">提交</button>
                </form>

                <Table dataSource={orderLines} bOrderLineed={true} rowSelection={rowSelection}>
                   
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
                    render={(text, record) => (
                        <span>
                        <Button onClick= {this.deleteOrderLineHandler.bind(this,record.id)}>删除</Button>
                        <Divider type="vertical" />
                        <Button onClick = {this.updateOrderLineHandler.bind(this,record.id)}>更改</Button>
                        </span>
                    )}
                    />
                </Table>
            </div>
        )
    }
}




export default OrderLine;