"use strict";
//// zadanie 4 z zestawu 12


let map = L.map("map", {
    zoom: 20,
    center: [51.248333, 22.559444]
});

let warstwa = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png");
map.addLayer(warstwa);



let xhr = new XMLHttpRequest();

xhr.open("GET", "https://pl.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=51.2483777|22.559637212&gsradius=5000&gslimit=5000&format=json&origin=*");

xhr.responseType = "json";
xhr.send();
let placLitewski = turf.point([ 22.559444,51.248333]);
let options = {units: "meters"} ;
xhr.addEventListener("load", function () {
    let xhrResponse = xhr.response.query.geosearch;
    for (let el of xhrResponse) {
        let lat = el.lat;
        let lon = el.lon;

        let marker = L.marker([lat, lon]);
        let from = turf.point([lon, lat]);
        let distance = turf.distance(from, placLitewski, options);
        marker.bindTooltip(`${el.title} <br> odleglosc ${distance.toFixed(2)}m`);
        map.addLayer(marker);



    }



});



