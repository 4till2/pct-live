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
    mileMarker(map)
    centerLine(map)
}

function addMapBasemap(map) {
    // Restricted key LiOgG1aQ5AphiucbQuRZ
    // Change key to allow origin when developing locally
    const MAPTILER_KEY = 'LiOgG1aQ5AphiucbQuRZ'
    let yo = `https://api.maptiler.com/maps/61255865-76da-477b-8c08-50b0aea648d4/style.json?key=${MAPTILER_KEY}`
    let raw = `https://api.maptiler.com/maps/0ab69978-b21c-4a50-b203-662f53cecde5/style.json?key=${MAPTILER_KEY}`
    let satellite = `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`
    let topo = `https://api.maptiler.com/maps/42d80c5e-8afc-4248-ad72-1a1ea95d5480/style.json?key=${MAPTILER_KEY}`
    map.setStyle(topo)
}

function addMapControls(map) {
    map.addControl(new maplibregl.NavigationControl({visualizePitch: true}), 'top-right');
}

export {addMapControls, addMapWaypoints, addMapSources, addMapBasemap}
