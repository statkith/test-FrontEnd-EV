import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import Home from "./pages/Home";
import SearchInput from "./components/SearchInput";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./App.css";
import MapArea from "./pages/MapArea";
import MapList from "./pages/MapList";

class App extends Component {
  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || " http://localhost:3000";
    this.socket = io.connect(this.server);

    this.state = {
      mindMapData: [],
      online: 0,
    };

    this.fetchMindMap = this.fetchMindMap.bind(this);
  }

  // Place socket.io code inside here
  componentDidMount() {
    this.fetchMindMap();
  }

  // Fetch data from the back-end
  fetchMindMap() {
    axios
      .get(`${this.server}/api/mindmap/`)
      .then((response) => {
        this.setState({ mindMapData: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Router>
        <div>
          <div className="search-input">
            <SearchInput />
          </div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/maparea">
              <MapArea
                mindMapData={this.state.mindMapData}
                server={this.server}
                socket={this.socket}
              />
            </Route>
            {this.state.mindMapData.map((mindmap_data, index) => (
              <Route path={"/map" + (index + 1)}>
                <MapList
                  mindMapData={[mindmap_data]}
                  server={this.server}
                  socket={this.socket}
                  indexNo={index}
                />
              </Route>
            ))}
          </Switch>
          <>
            {(() => {
              const url = window.location;
              const cleanedUrl = url.pathname.replace(/[0-9]/g, "");

              if (this.state.mindMapData.length > 1 && cleanedUrl === "/map") {
                return (
                  <>
                    <div className="pagination">
                      <Stack spacing={2} direction="row">
                        {this.state.mindMapData.map((mindmap_data, indexNo) => (
                          <>
                            <Button
                              variant="contained"
                              onClick={(e) =>
                                (window.location.href = "/map" + (indexNo + 1))
                              }
                            >
                              PART {indexNo + 1}
                            </Button>
                          </>
                        ))}
                      </Stack>
                    </div>
                  </>
                );
              }
            })()}
          </>
        </div>
      </Router>
    );
  }
}

export default App;
