import React,{useState,useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

/*open source npm module
documentation @ https://www.npmjs.com/package/react-dropzone */

function Upload(props) {
  const [file,setFile] = useState(null);
  
  // const files = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
    
  // ));
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map((files) =>{
      setFile(files.path+" - "+files.size+"bytes");
  
    })
    //props.upload(acceptedFiles);
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop});
  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()}/>
        <p>Drag {'&'} Drop the Evaluation Here</p>
       {file}
      </div>

    </section>
  );
}

export default Upload;