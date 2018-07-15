import React from 'react';
import { connect } from 'react-redux'

class Chart extends React.Component{
    constructor(props){
        super(props)
    }


    
    static getDerivedStateFromProps(props, prevState){
        
        return null;
    }


    render(){
        
        return(
            <div></div>
        
        )
    }

}

export default connect((state) => ({
    row : state.row
}))(Chart) 