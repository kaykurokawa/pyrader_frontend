import React from 'react';

class Buttons extends React.Component{
    constructor(props){
        super(props);

        this.disableButton.bind(this)
        this.enableButton.bind(this)
    }

    disableButton(select){
        let arrow_label = select + "-arrow"
        let x_label = select + "-x"
        let parent_div = select + "-parent"  
        document.getElementById(arrow_label).classList.remove("glyphicon", "glyphicon-arrow-right");
        document.getElementById(select).disabled = true
        document.getElementById(x_label).classList.remove("glyphicon", "glyphicon-remove");
        document.getElementById(parent_div).style.display = "none"  
    }

    enableButton(select){
        let arrow_label = select + "-arrow"
        let x_label = select + "-x"
        let parent_div = select + "-parent"
        document.getElementById(select).disabled = false
        document.getElementById(arrow_label).classList.add("glyphicon", "glyphicon-arrow-right")
        document.getElementById(x_label).classList.add("glyphicon", "glyphicon-remove")
        document.getElementById(parent_div).style.display = "block"

    }

    componentDidUpdate(){
        this.props.enabled ? this.enableButton("submit-react") : this.disableButton("submit-react")
    }

    render(){
    
        return(
            <div className="row">
                <div className="col-xs-8" style={{'marginLeft' : '4%', 'marginTop' : '2%'}} id="submit-react-div">
                    <div className="row">
                        <div className="col-xs-2 text-center" id="submit-react-parent" style={{'display' : 'none'}} >
                            <span id="submit-react-arrow" ></span>
                            <span id="submit-react-x"></span>
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