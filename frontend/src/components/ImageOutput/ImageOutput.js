import React from 'react'; 
import prediction from '../../images/prediction.png'

const ImageOutput = ({image_caption}) => {

    return(
        <div className="mt3 mw6 center">
            <img src={prediction} alt="" className="h-75 w-75"/>
            <p className="b white">{image_caption}</p>
        </div>
    );
}

export default ImageOutput;