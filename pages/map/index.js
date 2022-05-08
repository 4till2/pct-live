import React, {useEffect, useRef, useState} from 'react';
import maplibregl from 'maplibre-gl';
import {addMapBasemap, addMapControls, addMapSources, addMapWaypoints} from "../../lib/map/index";
import Seo from "../../components/Seo";
import parseKML from "parse-kml";
import moment from "moment";

export default function Map({waypoints}) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(waypoints[0]?.lng || 139.753);
    const [lat] = useState(waypoints[0]?.lat || 35.6844);
    const [zoom] = useState(14);
    useEffect(async () => {
        if (map.current) return; //stops map from initializing more than once
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
            <Seo title="Map – 4till2"
                 description="A real time map of my journey along the Pacific Crest Trail."/>
            <div className="map-wrap text-black">
                <div className="p-2 fixed top-4 ml-2 z-10 rounded-md bg-gray-300/80 text-xs text-center justify-center">
                    <div>
                        Click a {' '}
                        <span className="font-bold">Waypoint</span>{' '}
                        <span className="inline-block self-center rounded-lg bg-[#FF6347BF] w-[10px] h-[10px]"/>{' '}
                        or <span className="font-bold">Mile Marker</span> {' '}
                        <span className="inline-block self-center rounded-lg bg-[#00000080] w-[10px] h-[10px]"/>{' '}
                        <div>for more information.</div>
                    </div>
                </div>
                <div ref={mapContainer} className="map"/>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    // vercel times out if getting all kml data at once
    let daysago = moment().subtract(3, 'days').format();
    // Tracks
    //https://support.garmin.com/en-US/?faq=tdlDCyo1fJ5UxjUbA9rMY8
    let waypoints = await parseKML
        .toJson(`https://share.garmin.com/Feed/Share/4till2?d1=${daysago}&d2=2024-10-18T23:59z`)
        .then(e => {
                return (
                    e.features.map(entry => {
                        return {
                            title: 'Waypoint',
                            lat: entry.properties.Latitude || null,
                            lng: entry.properties.Longitude || null,
                            elevation: entry.properties.Elevation || null,
                            velocity: entry.properties.Velocity || null,
                            course: entry.properties.Course || null,
                            date: entry.properties.timestamp || null,
                            external_name: 'garmin'
                        }
                    })
                ).filter(m => m.lat && m.lng).reverse()
            }
        )
    // Waypoints
    // let response = await fetch('https://share.garmin.com/4till2/Waypoints')
    // let waypoints = await response.json().then(e => e.Waypoints.map(entry => {
    //     return {
    //         title: entry.X,
    //         lat: entry.L,
    //         lng: entry.N,
    //         elevation: entry.E,
    //         date: entry.C,
    //         updated_at: entry.M,
    //         external_id: entry.D,
    //         external_name: 'garmin'
    //     }
    // }).reverse())
    return {
        props: {waypoints},
    };
}
