import React from 'react';
import { Button } from 'antd';

class ProductDetails extends React.Component {
   
    goBack(){
        this.props.history.goBack();
    }

    render(){
        let data = this.props.location.state;
        return (
            <div className="product_details">
                 <h2>{data.name}的订单信息</h2>
                <Button onClick={this.goBack.bind(this)}>返回</Button>
                <p>{JSON.stringify(data)}</p>
                <img alt="图片迷路了" src={data.category.icon} style={{width:"10%",border:"1px solid red",padding:"1em",borderRadius:"5px"}}/>
            </div>
        )
    }
    

}

export default ProductDetails;