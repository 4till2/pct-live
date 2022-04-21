import maplibregl from "maplibre-gl";
import {centerLine, mileMarker} from "./sources";
import {waypointPopup} from "./popups";


const waypointMarkerElement = (current) => {
    const markerDiv = document.createElement("span");
    markerDiv.classList.add('map-marker')
    if (current) markerDiv.classList.add('current-mile')
    return markerDiv
}


function addMapWaypoints(map, waypoints) {
    waypoints.map((wp, index) => {
        new maplibregl.Marker({element: waypointMarkerElement(index == 0)})
            .setLngLat([wp.lng, wp.lat])
            .setPopup(new maplibregl.Popup({closeButton: false}).setHTML(waypointPopup(wp)))
            .addTo(map)
    })
}

function addMapSources(map) {
    centerLine(map)
    mileMarker(map)
}

function addMapBasemap(map) {
    const MAPTILER_KEY = 'F1le0FNRS2FUK8WIdcCN'
    let yo = `https://api.maptiler.com/maps/61255865-76da-477b-8c08-50b0aea648d4/style.json?key=${MAPTILER_KEY}`
    let satellite = `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`
    let raw = `https://api.maptiler.com/maps/0acc1418-8632-4009-97a0-66c02ac92f23/style.json?key=${MAPTILER_KEY}`
    map.setStyle(yo)
}

function addMapControls(map) {
    map.addControl(new maplibregl.NavigationControl({visualizePitch: true}), 'top-right');
}

export {addMapControls, addMapWaypoints, addMapSources, addMapBasemap}
