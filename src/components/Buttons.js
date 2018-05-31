import React from 'react';

class Buttons extends React.Component{
    constructor(props){
        super(props);

        this.disableButton.bind(this)
        this.enableButton.bind(this)
        this.handleCancel.bind(this)
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

    handleCancel(){
        console.log(this.props.priceMode)
        this.props.priceMode === true ? this.props.onCancel("price") : this.props.onCancel("block")
    }

    componentDidUpdate(){
        let currentComp = this
        if(this.props.priceMode){
            this.props.enabled ? this.enableButton("submit") : this.disableButton("submit")
            document.querySelector('#submit-x').onclick = () => {
                currentComp.handleCancel()
            }
            document.getElementById("block-submit-buttons").style.display = "none"
            document.getElementById("submit-buttons").style.display = "block"
        }else{
            this.props.enabled ? this.enableButton("block-submit") : this.disableButton("block-submit")
            document.querySelector('#block-submit-x').onclick = () => {
                currentComp.handleCancel()
            }
            document.getElementById("block-submit-buttons").style.display = "block"
            document.getElementById("submit-buttons").style.display = "none"
        }


    }


    render(){
    
        return(
            <div className="row">
                <div className="col-xs-8" style={{'marginLeft' : '4%', 'marginTop' : '2%'}} id="submit-div">
                    <div className="row">
                        <div className="col-xs-2 text-center" id="submit-parent" style={{'display' : 'none'}} >
                            <span id="submit-arrow" ></span>
                            <span id="submit-x"></span>
                        </div>
                        <div className="col-xs-2 text-center" id="block-submit-parent" style={{'display' : 'none'}} >
                            <span id="block-submit-arrow" ></span>
                            <span id="block-submit-x"></span>
                        </div>
                        <div className="col-xs-10" >
                            <div id="submit-buttons">
                                <button type="button" className="btn btn-primary floated" id="submit">Submit</button>
                                <button type="button" className="btn btn-success floated" id="reset">Reset</button>
                            </div>
                            <div id="block-submit-buttons">
                                <button type="button" className="btn btn-primary floated" id="block-submit">Submit</button>
                                <button type="button" className="btn btn-success floated" id="block-reset">Reset</button>
                            </div>
                                <span className="glyphicon glyphicon-question-sign" title="Help" data-toggle="modal" data-target="#myInstruct"></span>
                                <button data-toggle="modal" id = "share-link" data-target="#myShare" title="Share Link!">
                                    <img src="/graphics/clippy.svg" height="18" width="18" alt="Copy to clipboard"></img>
                                </button>
                                 
                        </div>
                    </div>
                </div>                                          
            </div>
        )
    }
}

export default Buttons