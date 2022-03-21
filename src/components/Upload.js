import React, { Component } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Progress } from "reactstrap";
import io from "socket.io-client";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Upload.css";

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);

    this.server = process.env.REACT_APP_API_URL || " http://localhost:3000";
    this.socket = io.connect(this.server);

    this.state = {
      selectedFile: { array: [] },
      loaded: 0,
      uploadComplete: "outlined",
      mapRecieved: false,
    };

    this.fetchMindMap = this.fetchMindMap.bind(this);
  }

  checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = [];
    // list allow mime type
    const types = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    // loop access array
    for (var i = 0; i < files.length; i++) {
      // compare file type find doesn't matach
      // eslint-disable-next-line
      if (types.every((type) => files[i].type !== type)) {
        // create error message and assign to container
        err[i] = files[i].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };

  maxSelectFile = (event) => {
    let files = event.target.files;
    if (files.length > 1) {
      const msg = "Only 1 files can be uploaded at a time";
      event.target.value = null;
      toast.warn(msg);
      return false;
    }
    return true;
  };

  checkFileSize = (event) => {
    let files = event.target.files;
    let size = 2000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };

  onChangeHandler = (event) => {
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      // if return true allow to setState
      this.setState({
        selectedFile: files,
        loaded: 0,
      });
    }

    this.setState({ uploadComplete: "contained" });
  };

  onClickHandler = () => {
    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;

    const data = new FormData();

    if (typeof this.state.selectedFile.length === "undefined") {
      toast.warning("Please select a file first");
    }

    for (var x = 0; x < this.state.selectedFile.length; x++) {
      data.append("file", this.state.selectedFile[x]);

      axios
        .post("http://localhost:3000/upload", data, {
          onUploadProgress: (ProgressEvent) => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            });
          },
        })
        .then((res) => {
          // then print response status
          toast.success("upload success");
          axios
            .post("http://localhost:5000/upload", {
              url:
                "D:\\Elephant-hive\\development\\mindmap_003\\InnoDevelopment-backEnd\\public\\upload\\" +
                this.state.selectedFile[0].name,
              height: screenHeight,
              width: screenWidth,
            })
            .then((response) => {
              return response;
            })
            .catch((error) => {
              return error;
            });
        })
        .catch((err) => {
          // then print response status
          toast.error("upload fail");
        });
    }

    this.fetchMindMap();
  };

  fetchMindMap() {
    axios
      .get(`${this.server}/api/mindmap/`)
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({ mapRecieved: true });
        }
      })

      .catch((err) => {
        return err;
      });
  }

  render() {
    return (
      <div className="upload-container">
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            className="form-control"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={this.onChangeHandler}
          />
          <Button
            color="primary"
            className="btn-choose"
            variant="outlined"
            component="span"
          >
            Choose a document
          </Button>
        </label>
        <div className="form-group">
          <ToastContainer />
          <Progress max="100" color="success" value={this.state.loaded}>
            {Math.round(this.state.loaded, 2)}%
          </Progress>
        </div>
        <Button
          className="btn-upload"
          color="primary"
          variant={this.state.uploadComplete}
          component="span"
          onClick={this.onClickHandler}
        >
          Upload
        </Button>
        {this.state.mapRecieved ? (
          <>
            <div style={{ marginTop: 20 }}>
              <Button
                color="success"
                variant="contained"
                component="span"
                onClick={(event) => (window.location.href = "/maparea")}
                endIcon={<ArrowForwardIosIcon />}
              >
                Go to Map Area
              </Button>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}
