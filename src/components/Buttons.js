import React from 'react';

class Buttons extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="row">
                <div className="col-xs-8" style={{'margin-left' : '4%', 'margin-top' : '2%'}} id="submit-div">
                    <div className="row">
                        <div className="col-xs-2 text-center" id="submit-parent" style={{'display' : 'none'}} >
                            <span id="submit-arrow" ></span>
                            <span id="submit-x"></span>
                        </div>
                        <div class="col-xs-4" >
                            <div>    
                                <button type="button" className="btn btn-primary floated" id="submit">Submit</button>
                                <button type="button" className="btn btn-success floated" id="reset">Reset</button>
                                <span class="glyphicon glyphicon-question-sign" title="Help" data-toggle="modal" data-target="#myInstruct"></span>
                                <button data-toggle="modal" id = "share-link" data-target="#myShare" title="Share Link!">
                                    <img src="/graphics/clippy.svg" height="18" width="18" alt="Copy to clipboard"></img>
                                </button>
                            </div>     
                        </div>
                    </div>
                </div>                                          
            </div>
        )
    }
}

export default Buttons