import moment from "moment";

function waypointPopup(waypoint) {
    return (`
<div class="text-black">
    <h3>Waypoint</h3>
    <p class='font-bold text-lg'>${moment(waypoint.date).format('MMMM Do YYYY, h:mm a')}</p>
    <p class = 'text-gray-500'> Location: <span class="font-bold">${waypoint.lat + ', ' + waypoint.lng}</span></p>
    <p class = 'text-gray-500'> Elevation: <span class="font-bold">${waypoint.elevation || ''}</span></p>
</div>`
    )
}

function mileMarkerPopup(mile) {
    return (
        `
<div class="text-black">
    <h3>PCT Mile Marker</h3>
    <p class='font-bold text-xl'>${mile}</p>
</div>`
    )
}

export {waypointPopup, mileMarkerPopup}
