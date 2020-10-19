//create map
const map = L.map('mapid').setView([-5.1233327,-42.8028737], 15);

//create and add tilelayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

//create icon 
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    inconAnchor: [29,68],
    popupAnchor: [175,35]
})

function addMarker({ id, name, lat, lng } = orphanage) {
    const popup = L.popup({
      closeButton: false,
      className: "map-popup",
      minWidth: 240,
      minHeight: 240,
    }).setContent(
      `${name} <a href="/orphanage?id=${id}"> <img src="/images/arrow-white.svg"> </a>`
    );
  
    L.marker([lat, lng], { icon }).addTo(map).bindPopup(popup);
  }

const orphanagesSpan = document.querySelectorAll(".orphanages span");

orphanagesSpan.forEach((span) => {
  const orphanage = {
    id: span.dataset.id,
    name: span.dataset.name,
    lat: span.dataset.lat,
    lng: span.dataset.lng,
  };

  addMarker(orphanage);
});