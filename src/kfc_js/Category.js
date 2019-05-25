import React from 'react';
import $ from 'jquery';
import { Button, Table, Divider} from 'antd';
import './Kfc.css';

class Category extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            arr:[],
            categories:[],
            form:{
                id:'',
                name:'',
                icon:''
            }
        }
    }

    componentWillMount(){
        this.loadCategory();
    }

    //加载
    loadCategory(){
        let url = "http://wangdoudou.cn:9999/category/findAll";
        $.get(url,({status,data})=>{
            if(status === 200){
                this.setState({
                    categories:data
                })
            } else {
                alert('接口异常');
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
        let url = "http://wangdoudou.cn:9999/category/saveOrUpdate";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.setState({
                form:{
                    id:'',
                    name:'',
                    icon:''
                }
            })
            $('.hidden').css('display','none');
            this.loadCategory();
        })
        event.preventDefault();
    };

    //删除
    deleteCategoryHandler(id){
        this.deleteCategoryById(id,({status,message}) =>{
            if(status === 200){
                alert(message);
                this.loadCategory();
            } else {
                alert(message);
            }
        })
    }
    deleteCategoryById(id,handler){
        let url ="http://wangdoudou.cn:9999/category/deleteById?id="+id;
        $.get(url,function(result){
            handler(result);
        })   
    }

    //更改
    updateCategoryHandler(id){
        this.findCategoryById(id,({status,message,data}) =>{
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
    findCategoryById(id,handler){
        let url = "http://wangdoudou.cn:9999/category/findById?id="+id;
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
                this.loadCategory();
            } else {
                alert(message);
            }
        })    
    }
    batchDeleteByIds(arr,handler){
        let url = "http://wangdoudou.cn:9999/category/deleteBatchByIds";
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
        let {form,categories} = this.state;
        let { Column} = Table;
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
            <div className="category">
                <h2>种类管理</h2>
                <div class="btns">
                    <Button type="primary" className="btn" onClick={this.displayHandler}>添加</Button>
                    <Button type="danger" className="btn" onClick = {this.bacthDeleteHandler.bind(this,this.state.arr)}>批量下架</Button>
                </div>
                
                {/* 表单 */}
                {JSON.stringify(form)}

                <form className="hidden" onSubmit={this.submitForm}>
                    <input type="text" name="id" hidden="hidden" />
                    类型名称&nbsp;&nbsp;&nbsp;
                    <input type="text" name="name" required="true" placeholder="请输入类型名称" value={form.name}  onChange={this.changeHandlar}/>   
                    图片&nbsp;&nbsp;&nbsp;
                    <input type="text" name="icon" required="true" placeholder="请输入图片地址!" value={form.icon} onChange={this.changeHandlar}/>  
                    <button className="primary">提交</button>
                </form>

                <Table dataSource={categories} bordered={true} rowSelection={rowSelection}>
                    <Column align="center" title="类型名称" dataIndex="name" key="name" />
                    <Column align="center" title="图片" dataIndex="icon" key="icon" />
                    <Column align="center"
                    title="操作"
                    key="action"
                    render={(text, record) => (
                        <span>
                        <Button onClick= {this.deleteCategoryHandler.bind(this,record.id)}>删除</Button>
                        <Divider type="vertical" />
                        <Button onClick = {this.updateCategoryHandler.bind(this,record.id)}>更改</Button>
                        </span>
                    )}
                    />
                </Table>
            </div>
        )
    }
}




export default Category;