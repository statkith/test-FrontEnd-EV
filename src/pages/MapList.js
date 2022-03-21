import React from 'react';
import Mindmap from '../components/Mindmap';
import './MapArea.css';

const MapList = (props) => {
    return (
        <div className="map-container">
            <Mindmap mindMapData={props.mindMapData} server={props.server}
                socket={props.socket} />
        </div>
    );
}

export default MapList;
