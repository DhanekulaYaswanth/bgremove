import React from "react";
import './FilePreview.css'


function FilePreview(props){
    const {uploadedfile,uploadedurl,processedImage} = props;




    return(
        <div className="imagecontainer">
            <div className="filepreview">
                {uploadedfile || uploadedurl ?
                <img src={uploadedurl || URL.createObjectURL(uploadedfile)} alt="error in file preview"></img>
                :
                <h1>File Preview</h1>}
            </div>
            <div className="filepreview">
            {processedImage ?
                <img src={processedImage} alt="error in file preview"></img>
            :
             <h1>Processed image</h1>}
            </div>
        </div>
    )
}


export default FilePreview;