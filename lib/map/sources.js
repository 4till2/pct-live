import FeatureService from "mapbox-gl-arcgis-featureserver";
import maplibregl from "maplibre-gl";
import {mileMarkerPopup} from "./popups";

function mileMarker(map) {
    const mile_markers_id = 'mile-markers'

    new FeatureService(mile_markers_id, map, {
        url: 'https://services5.arcgis.com/ZldHa25efPFpMmfB/ArcGIS/rest/services/PCTA_Mile_Marker_2022/FeatureServer/0/',
    })


    map.addLayer({
        'id': mile_markers_id,
        'source': mile_markers_id,
        'type': 'circle',
        'paint': {
            'circle-color': '#000'
        }
    })

    map.on('click', mile_markers_id, function (e) {
        let coordinates = e.features[0].geometry.coordinates.slice();
        let mile = e.features[0].properties.Mile;

// Ensure that if the map is zoomed out such that
// multiple copies of the feature are visible, the
// popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new maplibregl.Popup({closeButton: false})
            .setLngLat(coordinates)
            .setHTML(mileMarkerPopup(mile))
            .addTo(map);
    });
}

function centerLine(map) {
    const center_line_id = 'center-line'

    new FeatureService(center_line_id, map, {
        url: 'https://services5.arcgis.com/ZldHa25efPFpMmfB/ArcGIS/rest/services/PCTA_Centerline/FeatureServer/0'
    })

    map.addLayer({
        'id': 'Center_Line',
        'source': center_line_id,
        'type': 'line',
        'paint': {
            'line-color': '#fff',
            'line-width': 1,
        }
    })
}

export {centerLine, mileMarker}
