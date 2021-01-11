import React from 'react'
import "./Modal.css"


function Modal() {

    function toggleModal(){
        document.getElementsByClassName("modal").style.display = "block"
    }

    window.onclick = function(event){
        if(event.target ===  document.getElementById("myModal")){
            document.getElementsByClassName("modal").style.display = "none"
        }
    }

    return (
        <div>
            <div className="wrap">
                <a href="#show" className="modal-open">Click To Show</a>

                <div className="overlay" id="show">
                <div className="modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 560 280" preserveAspectRatio="true">
                                                
                <line id="svg_3" fill="none" stroke="#000000" stroke-width="2" x1="2.0" y1="2.0" x2="558" y2="2.0"/>
                
                <line id="svg_4" fill="none" stroke="#000000" stroke-width="2" x1="558" y1="278" x2="558" y2="2.0"/>
                
                <line id="svg_2" fill="none" stroke="#000000" stroke-width="2" x1="2.0" y1="278" x2="558" y2="278"/>
                
                <line id="svg_5" fill="none" stroke="#000000" stroke-width="2" x1="2.0" y1="2.0" x2="2.0" y2="278"/>
                
                </svg>
                <div className="modal-inner">
                    <a href="#" className="modal-close" title="Close Modal">vvvvvvvvvvv</a>
                    <h3>Modal Title</h3>
                    <p> this isthe moniusn  nguivn uigvn uigv nfgi gu nfgun givn guiv ngfivnfguvgn uivfgn i ngfb fgnivu </p>
                </div>
                </div>
                
                </div>
                
            </div>
        </div>
    )
}

export default Modal
