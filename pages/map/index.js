import React, {useEffect, useRef, useState} from 'react';
import maplibregl from 'maplibre-gl';
import {addMapBasemap, addMapControls, addMapSources, addMapWaypoints} from "../../lib/map/index";

export default function Map({waypoints}) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(waypoints[0]?.lng || 139.753);
    const [lat] = useState(waypoints[0]?.lat || 35.6844);
    const [zoom] = useState(14);
    useEffect(async () => {
        if (map.current) return; //stops map from intializing more than once
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            center: [lng, lat],
            zoom: zoom
        });
        addMapBasemap(map.current)
        map.current.on('load', () => {
            addMapControls(map.current)
            addMapWaypoints(map.current, waypoints)
            addMapSources(map.current)
        })
    });
    return (
        <>
            <link href='https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css' rel='stylesheet'/>

            <div className="map-wrap">
                <div ref={mapContainer} className="map"/>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    let response = await fetch('https://share.garmin.com/4till2/Waypoints')
    let waypoints = await response.json().then(e => e.Waypoints.map(entry => {
        return {
            title: entry.X,
            lat: entry.L,
            lng: entry.N,
            elevation: entry.E,
            date: entry.C,
            updated_at: entry.M,
            external_id: entry.D,
            external_name: 'garmin'
        }
    }).reverse())
    return {
        props: {waypoints},
    };
}
