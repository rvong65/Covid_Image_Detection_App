import React from 'react'; 
import { FileUploader } from "react-drag-drop-files";

const ImageInput = ({handleChange}) => {
    return(
        <div className="mt3 w-25-l center">
            <FileUploader name="file" types={["JPG", "PNG", "JPEG"]} handleChange={handleChange} label="Upload or drag and drop an image here"/>
        </div>
    );
}

export default ImageInput;