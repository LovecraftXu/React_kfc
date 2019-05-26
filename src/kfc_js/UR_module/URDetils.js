import React from 'react';
import { Button } from 'antd';

class URDetails extends React.Component {
   
    goBack(){
        this.props.history.goBack();
    }

    render(){
        return (
            <div className="ur_details">
                <h2>{JSON.stringify(this.props.location.data)}</h2>
                <Button onClick={this.goBack.bind(this)}>返回</Button>

                {/* <img src={this.props.location.state} style={{width:"50%",border:"1px solid red",padding:"1em",borderRadius:"5px"}}/> */}
            </div>
        )
    }
    

}

export default URDetails;