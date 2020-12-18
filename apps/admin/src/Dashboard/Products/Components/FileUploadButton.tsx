import React, { useState, Component } from "react";
import Files from "react-butterfiles";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

export default function FileUploadButton({ handlerImages, images }) {
    const [files, setFiles] = useState([]);
    const handleFiles = (selectedFile) => {
        files.push(selectedFile);
        setFiles(files);
    };

    class ImagesOnEdit extends Component {
        render() {
            return images.map((img) => (
                <li key={img}>
                    <Typography variant="subtitle1" align="center" gutterBottom>
                        {img}
                    </Typography>
                </li>
            ));
        }
    }

    return (
        <Files
            // multiple={true}
            maxSize="6mb"
            multipleMaxSize="10mb"
            // multipleMaxCount={5}
            accept={["image/jpg", "image/jpeg", "image/png"]}
            onSuccess={([selectedFile]) => {
                handleFiles(selectedFile);
                handlerImages(files);
            }}
            // onError={errors => this.setState({ errors })}
        >
            {({ browseFiles, getDropZoneProps }) => {
                return (
                    <div>
                        <div
                            {...getDropZoneProps({
                                style: {
                                    width: 300,
                                    minHeight: 200,
                                    border: "2px lightgray dashed"
                                }
                            })}
                        >
                            <br />
                            <Typography variant="subtitle2" align="center" gutterBottom>
                                Soltá y cargá.
                            </Typography>
                            <ol>
                                {images && <ImagesOnEdit />}
                                {files.map((file) => (
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
                        <div>
                            {" "}
                            <br />
                            <FormControl>
                                <Button color="secondary" variant="outlined" onClick={browseFiles}>
                                    <Input
                                        id="images"
                                        type="file"
                                        aria-describedby="images-helper"
                                        fullWidth
                                        style={{ display: "none" }}
                                    />
                                    Cargar Imágenes
                                </Button>
                            </FormControl>
                        </div>
                    </div>
                );
            }}
        </Files>
    );
}
