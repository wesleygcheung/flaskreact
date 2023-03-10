import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom"

const About = () => {
  const context = useOutletContext();
  const state = useSelector((state)=>
    state
  );

  const dispatch = useDispatch();
  const handleClick = (color) =>{
    // On click of button I want to change the menu to black
    console.log('You clicked me');
    const action = {type: 'changeColor',payload:color}
    dispatch(action);
  }
  useEffect(()=>{console.log({state})},[state])
  return (
      <div className="grid-container">
        <div className="grid-sub-container">
          <h1>About</h1>
          <button onClick={()=>handleClick('dark')}>Dark</button>
          <button onClick={()=>handleClick('light')}>Light</button>
          <h2>{!!context.user && context.user.displayName}</h2>
        </div>
      </div>
    );
};
  
  export default About;