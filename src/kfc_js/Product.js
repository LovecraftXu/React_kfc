import React from 'react';
import $ from 'jquery';
import { Button, Table, Divider } from 'antd';
import './Kfc.css';

class Product extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            arr:[],
            categories:[],
            products:[],
            form:{
                id:'',
                name:'',
                description:'',
                price:'',
                photo:'',
                status:'',
                xiaoliang:'',
                categoryId:''
            }
        }
    }

    componentWillMount(){
        this.loadProduct();
        this.loadCategory();
    }

    //加载
    loadProduct(){
        let url = "http://wangdoudou.cn:9999/product/findAllWithCategory";
        $.get(url,({status,data,message})=>{
            if(status === 200){
                this.setState({
                    products:data  
                })
            } else {
                alert(message);
            }
        });
    }
    //加载
    loadCategory(){
        let url = "http://wangdoudou.cn:9999/category/findAll";
        $.get(url,({status,data,message})=>{
            if(status === 200){
                this.setState({
                    categories:data,
                    form:{...this.state.form,
                        ...{categoryId:data[0].id}
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
        let url = "http://wangdoudou.cn:9999/product/saveOrUpdate";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.setState({
                form:{
                    id:'',
                    name:'',
                    description:'',
                    price:'',
                    photo:'',
                    status:'',
                    xiaoliang:'',
                    categoryId:''
                }
            })
            $('.hidden').css('display','none');
            this.loadProduct();
            this.loadCategory();
        })
        event.preventDefault();
    };

    //删除
    deleteProductHandler(id){
        this.deleteProductById(id,({status,message}) =>{
            if(status === 200){
                alert(message);
                this.loadProduct();
            } else {
                alert(message);
            }
        })
    }
    deleteProductById(id,handler){
        let url ="http://wangdoudou.cn:9999/product/deleteById?id="+id;
        $.get(url,function(result){
            handler(result);
        })   
    }

    //更改
    updateProductHandler(id){
        this.findProductById(id,({status,message,data}) =>{
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
    findProductById(id,handler){
        let url = "http://wangdoudou.cn:9999/product/findById?id="+id;
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
                this.loadProduct();
            } else {
                alert(message);
            }
        })    
    }
    batchDeleteByIds(arr,handler){
        let url = "http://wangdoudou.cn:9999/product/deleteBatchByIds";
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
        let {form,products,categories} = this.state;
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
            <div className="product">
                <h2>产品管理</h2>
                <div class="btns">
                    <Button type="primary" className="btn" onClick={this.displayHandler}>添加</Button>
                    <Button type="danger" className="btn" onClick = {this.bacthDeleteHandler.bind(this,this.state.arr)}>批量下架</Button>
                </div>
                
                {/* 表单 */}
                {JSON.stringify(form)}

                <form className="hidden" onSubmit={this.submitForm}>
                    <input type="text" name="id" hidden="hidden" />
                    产品名称&nbsp;&nbsp;&nbsp;
                    <input type="text" name="name" required="true" placeholder="请输入产品名称!" value={form.name} onChange={this.changeHandlar}/>
                    描述&nbsp;&nbsp;&nbsp;
                    <input type="text" name="description" required="true" placeholder="请输入描述!" value={form.description} onChange={this.changeHandlar}/>
                    价格&nbsp;&nbsp;&nbsp;
                    <input type="text" name="price" required="true" placeholder="请输入价格!" value={form.price} onChange={this.changeHandlar}/>
                    图片&nbsp;&nbsp;&nbsp;
                    <input type="text" name="photo" required="true" placeholder="请输入图片!" value={form.photo} onChange={this.changeHandlar}/>
                    状态&nbsp;&nbsp;&nbsp;
                    <input type="text" name="status" required="true" placeholder="请输入状态!" value={form.status} onChange={this.changeHandlar}/>
                    销量&nbsp;&nbsp;&nbsp;
                    <input type="text" name="xiaoliang" required="true" placeholder="请输入销量!" value={form.xiaoliang} onChange={this.changeHandlar}/>
                    种类名&nbsp;&nbsp;&nbsp;
                    <select name="categoryId" value={form.categoryId} onChange={this.changeHandlar}>
                        {
                            categories.map((item)=>{
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>  
                    <button className="primary">提交</button>
                </form>

                <Table dataSource={products} bProducted={true} rowSelection={rowSelection}>
                   
                    <Column align="center" title="产品名称" dataIndex="name" key="name" />
                    <Column align="center" title="描述" dataIndex="description" key="description" />
                    <Column align="center" title="价格" dataIndex="price" key="price" />
                    <Column align="center" title="图片" dataIndex="photo" key="photo" />
                    <Column align="center" title="状态" dataIndex="status" key="status" />
                    <Column align="center" title="销量" dataIndex="xiaoliang" key="xiaoliang" />                    
                    <Column align="center" title="种类名" key="category" render={(record) => (
                        <span>
                        {record.category.name}
                        </span>
                    )} />
                    <Column align="center"
                    title="操作"
                    key="action"
                    render={(text, record) => (
                        <span>
                        <Button onClick= {this.deleteProductHandler.bind(this,record.id)}>删除</Button>
                        <Divider type="vertical" />
                        <Button onClick = {this.updateProductHandler.bind(this,record.id)}>更改</Button>
                        </span>
                    )}
                    />
                </Table>
            </div>
        )
    }
}




export default Product;