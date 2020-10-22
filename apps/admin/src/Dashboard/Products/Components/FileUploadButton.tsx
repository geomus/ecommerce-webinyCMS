import React, { useState } from "react";
import Files from "react-butterfiles";

import { Input, Button, FormControl, Typography } from '@material-ui/core/';

export default function FileUploadButton ({ handlerImages }){
    const [files, setFiles] = useState([]);
    const handleFiles = (selectedFile) => {
        files.push(selectedFile);
        setFiles(files);
    };
    return (
        <Files
        // multiple={true}
        maxSize="6mb"
        multipleMaxSize="10mb"
        // multipleMaxCount={5}
        accept={["image/jpg","image/jpeg","image/png"]}
        onSuccess={( [selectedFile] )=>{
            handleFiles(selectedFile);
            handlerImages(files);
        }}
        // onError={errors => this.setState({ errors })}
        >
            {({ browseFiles, getDropZoneProps }) =>{
                return (
                    <div >
                        <div
                            {...getDropZoneProps({
                                style: {
                                    width: 400,
                                    minHeight: 200,
                                    border: "2px lightgray dashed"
                                }
                            })}
                        >
                            <br/>
                            <Typography variant="subtitle2" gutterBottom>
                                Soltá y cargá.
                            </Typography>
                            <ol>
                                {files.map(file => (
                                    <li key={file.name}>{file.name}</li>
                                ))}
                                {/* {this.state.errors.map(error => (
                                    <li key={error.id}>
                                        {error.file ? (
                                            <span>
                                                {error.file.name} - {error.type}
                                            </span>
                                        ) : (
                                            error.type
                                        )}
                                    </li>
                                ))} */}
                            </ol>
                    </div>
                    <div> <br/>
                    <FormControl>
                        <Button color="secondary" variant="outlined" onClick={browseFiles}>
                            <Input id="images" type="file" aria-describedby="images-helper" fullWidth style={{ display: "none" }}/>
                            Cargar Imágenes
                        </Button>
                    </FormControl>
                    </div>
                </div>
                )}
            }
        </Files>
    )
}