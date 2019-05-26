import React from 'react';
import { Button } from 'antd';

class CategoryDetails extends React.Component {
   
    goBack(){
        this.props.history.goBack();
    }

    render(){
        let data = this.props.location.state;
        return (
            <div className="category_details">
                <h2>{data.name}的详细信息</h2>
                <Button onClick={this.goBack.bind(this)}>返回</Button>

                {JSON.stringify(data)}


                <img alt="图片迷路了" src={data.icon} style={{width:"50%",border:"1px solid red",padding:"1em",borderRadius:"5px"}}/>
            </div>
        )
    }
    

}

export default CategoryDetails;