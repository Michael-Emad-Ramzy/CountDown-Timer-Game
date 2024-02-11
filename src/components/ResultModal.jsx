import { forwardRef , useImperativeHandle ,useRef } from "react"
import { createPortal } from "react-dom";
//  this createPortal is used PORTALS wich is used to render 
//  the sectoin of wraped code in the portal u pointer to. (look to the creat code below)

const ResultModal = forwardRef(function ResultModal({targetTime , remainingTime , onReset} , ref){

    const dialog = useRef();

    const userLost = remainingTime <=0 ;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1- remainingTime / (targetTime*1000)) * 100);

    // useImperativeHandle() It allows you to control what properties or methods are exposed on 
    // the ref object when the parent component uses ref to access the child component.
    // This is useful when you want to encapsulate the internal logic of a component but
    // still allow the parent component to interact with certain aspects of it through a ref.
    useImperativeHandle(ref , ()=>{
        return {
            open(){
                dialog.current.showModal();
            }
        }
    })
            // this createPortal take two arguments one is the jsx code and the other is 
            // the destination will rinder this jsx code in .
    return createPortal(
        //dialog tags is a html tag to pop up dial box
        <dialog className="result-modal" ref={dialog} onClose={onReset}>
            {userLost ?<h2>You lost</h2> : <h2>Your Score : {score}</h2>}
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You sttoped the Timer with <strong>{formattedRemainingTime} second left</strong>
            </p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    )
})

export default ResultModal ;