/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
let map

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    })
}