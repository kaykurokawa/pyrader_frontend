import React from 'react';

class Buttons extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="row">
                <div className="col-xs-8" style={{'marginLeft' : '4%', 'marginTop' : '2%'}} id="submit-div-react">
                    <div className="row">
                        <div className="col-xs-2 text-center" id="submit-parent-react" style={{'display' : 'none'}} >
                            <span id="submit-arrow-react" ></span>
                            <span id="submit-x-react"></span>
                        </div>
                        <div className="col-xs-4" >
                            <div>    
                                <button type="button" className="btn btn-primary floated" id="submit-react">Submit</button>
                                <button type="button" className="btn btn-success floated" id="reset-react">Reset</button>
                                <span className="glyphicon glyphicon-question-sign" title="Help" data-toggle="modal" data-target="#myInstruct"></span>
                                <button data-toggle="modal" id = "share-link-react" data-target="#myShare" title="Share Link!">
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