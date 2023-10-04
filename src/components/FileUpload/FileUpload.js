import React, { useState } from "react";
import './FileUpload.css'
import FilePreview from "../FilePreview/FilePreview";


function FileUpload(){
    const [uploadedfile,setuploadedfile] = useState(null)
    const [uploadedurl,setuploadedurl] = useState(false)
    const [processedImage, setProcessedImage] = useState(null);
    const [loading,setloading] = useState(false);

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        const fileReader = new FileReader();
        setProcessedImage(null);
        setloading(false);
        fileReader.onload = () => {
            setuploadedfile(file)
        };

        fileReader.readAsDataURL(file);
        // document.getElementById('texturl').classList.remove('urltextexpanded')
        setuploadedurl('')
    }
 


    // const handleURL = () =>{
    //         document.getElementById('texturl').classList.add('urltextexpanded')
    // }


    // const validateURL = () =>{
    //     const url = document.getElementById('texturl').value;
    //     const regex = /^(https?|ftp):\/\/([^\s/$.?#].[^\s]*)$/i;
    //     if(regex.test(url) || url==='')
    //     {
    //         document.getElementById('texturl').classList.remove('badurl');
    //         setuploadedurl(url)
    //         setuploadedfile(false)
    //     }
    //     else{
    //         document.getElementById('texturl').classList.add('badurl');
    //     }
    // }


    let imageURL;

    function submitHandler(e){
        e.preventDefault();
        setloading(true);
        // console.log("click");
        const fileInput = document.getElementById('images');
        console.log(fileInput.files);
        const image = fileInput.files[0];

        // Multipart file
        const formData = new FormData();
        formData.append('image_file', image);
        formData.append('size', 'auto');

        const apiKey = 'f1orqr57SBNQyja2pUekeZfY';
        // const apiKey = '2LiDofgci7QP7yfy18A5fZ5k';


        fetch('https://api.remove.bg/v1.0/removebg',{
            method:'POST',
            headers: {
            'X-Api-Key': apiKey,
         },
         body: formData
        })
        .then(function(reponse){
                return reponse.blob()
        })
        .then(function(blob){
                console.log(blob);
                const url = URL.createObjectURL(blob);
                imageURL = url;
                setProcessedImage(imageURL);
                // const img = document.createElement('img');
                // img.src = url;
                // document.body.appendChild(img);
        })
        .catch();
    }


    function downloadFile(e){
        e.preventDefault();
        var a = document.createElement('a'); //<a></a>
            a.href = processedImage;
            var name = String(uploadedfile.name).split('.')
            a.download = name[0]+'.png';
            document.body.appendChild(a);
    
            a.click();
    
            document.body.removeChild(a);
       }



    return(
        <div className="fileuploadcontainer">
            <form onSubmit={processedImage?downloadFile:submitHandler}>
                <div className="filecontainer">
                        <div className="choseopt">
                            <label htmlFor="images" className="drop-container" id="dropcontainer">
                                <span htmlFor='images' className="docs"></span>

                                <span className="drop-title">Drop files here</span>
                                or
                                <input type="file" id="images" accept="image/*" required onChange={handleFileChange}/>
                            </label>
                            {/* <label className="url" onClick={handleURL}><input type='text' id='texturl' className="urltext" placeholder="Paste the URL (ctrl + v)" onChange={validateURL}/><label>Paste the <button >URL</button> here</label></label> */}
                        </div>
                        <div>
                            <FilePreview uploadedfile={uploadedfile} uploadedurl={uploadedurl} processedImage={processedImage}/>
                        </div>
                </div>

                {
                    processedImage?
                            <input type="submit" value="Download" className="submitbtn" />
                                    
                    :
                        loading?   
                            <div className="loading">
                                <div className="loading1"/>
                                <div className="loading2"/>
                                <div className="loading3"/>
                                <div className="loading4"/>
                            </div>
                        :
                            <input type="submit" value="Remove Background" className="submitbtn"/>
                }
            </form>
        </div>
    )
}


export default FileUpload;