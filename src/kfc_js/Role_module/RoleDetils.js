import React from 'react';
import { Button } from 'antd';

class RoleDetails extends React.Component {
   
    goBack(){
        this.props.history.goBack();
    }

    render(){
        let data = this.props.location.state;
        return (
            <div className="role_details">
                <h2>{data.name}的详细信息</h2>
                <Button onClick={this.goBack.bind(this)}>返回</Button>

                {JSON.stringify(data)}

            </div>
        )
    }
    

}

export default RoleDetails;