(function () {
  const container = document.getElementById("travel-map");
  if (!window.L) {
    container.textContent = "The map couldn't load. You can still see my visited places below.";
    return;
  }

  // Country coordinates are representative locations, not specific visited cities.
  const places = [
    { name: "China", coordinates: [35.86, 104.20] },
    { name: "Canada", coordinates: [56.13, -106.35] },
    { name: "United States", coordinates: [39.83, -98.58] },
    { name: "Mexico", coordinates: [23.63, -102.55] },
    { name: "Cairo", coordinates: [30.04, 31.24], city: true },
    { name: "Cancun", coordinates: [21.16, -86.85], city: true },
    { name: "Costa Rica", coordinates: [9.75, -83.75] },
    { name: "Peru", coordinates: [-9.19, -75.02] },
    { name: "Japan", coordinates: [36.20, 138.25] },
    { name: "Australia", coordinates: [-25.27, 133.78] }
  ];

  container.textContent = "";
  const map = L.map(container, { scrollWheelZoom: false });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const chips = document.querySelector(".travel-places");
  chips.textContent = "";
  places.forEach(function (place) {
    const popup = document.createElement("div");
    popup.textContent = place.name + (place.city ? " — visited city" : " — visited country (approximate location)");
    const marker = L.marker(place.coordinates, { title: place.name, alt: place.name })
      .addTo(map).bindPopup(popup);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "travel-chip";
    button.textContent = place.name;
    button.setAttribute("aria-label", "Show " + place.name + " on the map");
    button.addEventListener("click", function () {
      map.setView(place.coordinates, place.city ? 6 : 4);
      marker.openPopup();
    });
    chips.appendChild(button);
  });

  function showAll() {
    map.fitBounds(places.map(function (place) { return place.coordinates; }), { padding: [30, 30] });
  }
  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "travel-chip";
  reset.textContent = "Show all places";
  reset.addEventListener("click", function () { map.closePopup(); showAll(); });
  chips.appendChild(reset);
  showAll();
})();
