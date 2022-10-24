import React from 'react'; 
import Typewriter from 'typewriter-effect';

const Animate = ({started}) => {
    return(
        <div className="mt7 w-100 center">
            {started === false &&
            <div className="f2 white"> 
            <Typewriter
                options={{
                strings: ["Let's Get Started!", "⬇️ Upload or Drag and Drop an Image", "⌛ Wait for the Classifier to Predict the Results! "],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 25
            }}
            />
            </div>}
        </div>)
}

export default Animate;