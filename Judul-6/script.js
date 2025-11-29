const API_KEY = "78998e1a769ed6fd97c619e7c65cdcce";


let favoriteCities = ["Jakarta","Tokyo"];
let isCelsius = true;
let lastCity = "";     

loadFavorites();
applySavedSettings();
renderFavoriteList();


function showLoading(show=true){
  const el = document.getElementById("loading");
  if(!el) return;
  el.classList.toggle("d-none", !show);
}
function showToast(msg, colorClass="text-bg-danger"){
  const toastEl = document.getElementById("toast");
  const body = document.getElementById("toastBody");
  body.textContent = msg;
  toastEl.className = `toast align-items-center ${colorClass} border-0`;

  try{
    const bsToast = bootstrap.Toast.getInstance(toastEl) || new bootstrap.Toast(toastEl, { delay: 3000 });
    bsToast.show();
  }catch(e){
    alert(msg);
  }
}


function saveFavorites(){ localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities)); }
function loadFavorites(){
  const s = localStorage.getItem("favoriteCities");
  if(s) favoriteCities = JSON.parse(s);
}
function saveSettings(){
  localStorage.setItem("weather_unit", isCelsius ? "metric" : "imperial");
  localStorage.setItem("weather_theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}
function applySavedSettings(){
  const u = localStorage.getItem("weather_unit");
  if(u) {
    isCelsius = u === "metric";
    document.getElementById("unitSelect").value = isCelsius ? "metric" : "imperial";
  }
  const th = localStorage.getItem("weather_theme");
  if(th === "dark") document.body.classList.add("dark-mode");
}

function translateWeather(desc){
  if(!desc) return "";
  const dict = {
    "overcast clouds": "Awan Mendung",
    "broken clouds": "Awan Pecah",
    "scattered clouds": "Awan Tersebar",
    "few clouds": "Sedikit Berawan",
    "clear sky": "Cerah",
    "light rain": "Hujan Ringan",
    "moderate rain": "Hujan Sedang",
    "heavy intensity rain": "Hujan Lebat",
    "thunderstorm": "Badai Petir",
    "mist": "Berkabut",
    "haze": "Kabut Asap",
    "shower rain": "Hujan Lokal",
    "snow": "Salju"
  };
  return dict[desc.toLowerCase()] || desc;
}


async function getWeather(city){
  if(!city) return;
  lastCity = city.trim();
  showLoading(true);

  const unit = isCelsius ? "metric" : "imperial";

  try {
    const [r1, r2] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`)
    ]);

    const current = await r1.json();
    const forecast = await r2.json();

    if(r1.status === 404 || current.cod === "404"){
      showToast("Kota tidak ditemukan!", "text-bg-warning");
      showLoading(false);
      return;
    }

    if(r1.status !== 200){
      showToast("Gagal memuat data cuaca!", "text-bg-danger");
      showLoading(false);
      return;
    }

    renderCurrent(current, unit);
    renderForecast(forecast, unit);

  } catch(err){
    console.error(err);
    showToast("Gagal memuat data cuaca!", "text-bg-danger");
  } finally {
    showLoading(false);
  }
}

function renderCurrent(data, unit){
  const city = data.name || "-";

  document.getElementById("cityName").textContent = city;
  document.getElementById("weatherDesc").textContent = translateWeather(data.weather[0].description);
  document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}${unit==="metric"?"°C":"°F"}`;

  document.getElementById("meta").innerHTML = `
    Kelembapan: <b>${data.main.humidity}%</b> • 
    Angin: <b>${data.wind.speed}${unit==="metric"?" m/s":" mph"}</b> • 
    <small>Pembaruan: ${new Date().toLocaleTimeString("id-ID")}</small>
  `;

  const favBtn = document.getElementById("saveFavoriteBtn");
  favBtn.classList.remove("d-none");
  favBtn.onclick = () => addFavorite(city);
}

function renderForecast(data, unit){
  const container = document.getElementById("forecast");
  container.innerHTML = "";

  if(!data || !Array.isArray(data.list)){
    container.innerHTML = `<div class="col-12"><em>Tidak ada data prakiraan.</em></div>`;
    return;
  }

  const daily = {};
  data.list.forEach(item=>{
    const [date, time] = item.dt_txt.split(" ");
    if(!daily[date]) daily[date] = item;
    if(time === "12:00:00") daily[date] = item;
  });

  const days = Object.keys(daily).slice(0,5);

  days.forEach(date=>{
    const item = daily[date];
    const dt = new Date(item.dt * 1000);
    const namaHari = dt.toLocaleDateString("id-ID",{weekday:"long"});
    const icon = item.weather[0].icon;
    const desc = translateWeather(item.weather[0].description);
    const tempMin = Math.round(item.main.temp_min);
    const tempMax = Math.round(item.main.temp_max);

    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-2";
    col.innerHTML = `
      <div class="forecast-card p-2 shadow-sm h-100">
        <h6 class="mb-1">${namaHari}</h6>
        <small class="text-muted">${date}</small>
        <div class="py-2"><img src="https://openweathermap.org/img/wn/${icon}@2x.png"></div>
        <div class="text-capitalize">${desc}</div>
        <div class="mt-1 fw-bold">${tempMax}${unit==="metric"?"°C":"°F"} 
        <span class="text-muted">/ ${tempMin}${unit==="metric"?"°C":"°F"}</span></div>
      </div>
    `;
    container.appendChild(col);
  });
}

let suggestTimer = null;
const suggestionsBox = document.getElementById("suggestions");

document.getElementById("cityInput").addEventListener("input", function(){
  const q = this.value.trim();
  suggestionsBox.style.display = "none";
  suggestionsBox.innerHTML = "";
  
  if(suggestTimer) clearTimeout(suggestTimer);
  if(q.length < 2) return;

  suggestTimer = setTimeout(async ()=>{
    try {
      const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=6&appid=${API_KEY}`);
      const data = await res.json();
      
      if(!Array.isArray(data) || data.length === 0) return;

      suggestionsBox.innerHTML = data
        .map(loc => `<button type="button" class="list-group-item list-group-item-action">${loc.name}, ${loc.country}</button>`)
        .join("");

      suggestionsBox.style.display = "block";

      Array.from(suggestionsBox.querySelectorAll("button")).forEach(btn=>{
        btn.addEventListener("click", ()=>{
          const txt = btn.textContent.split(",")[0].trim();
          document.getElementById("cityInput").value = txt;
          suggestionsBox.style.display = "none";
          lastCity = txt;
          getWeather(txt);
        });
      });

    } catch(e){ console.error(e); }

  }, 300);
});

function renderFavoriteList(){
  const el = document.getElementById("favoriteList");

  el.innerHTML = favoriteCities.map(city => `
    <div class="favorite-item">
      <div class="left" onclick="(function(){ lastCity='${city}'; getWeather('${city}'); })()">
        <i class="fa-solid fa-location-dot text-primary"></i>
        <span>${city}</span>
      </div>
      <div>
        <button class="btn btn-sm btn-danger" onclick="(function(e){ e.stopPropagation(); removeFavorite('${city}'); })(event)">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `).join("");
}

function addFavorite(city){
  if(!city || city === "-"){
    showToast("Tidak bisa menambahkan kota tidak valid!", "text-bg-warning");
    return;
  }

  if(!favoriteCities.includes(city)){
    favoriteCities.push(city);
    saveFavorites();
    renderFavoriteList();
    showToast("Ditambahkan ke favorit!", "text-bg-success");
  } else {
    showToast("Kota sudah ada di favorit", "text-bg-info");
  }
}

function removeFavorite(city){
  favoriteCities = favoriteCities.filter(c => c !== city);
  saveFavorites();
  renderFavoriteList();
}

document.getElementById("searchBtn").addEventListener("click", ()=>{
  const q = document.getElementById("cityInput").value.trim();
  if(q){ lastCity = q; getWeather(q); }
});

document.getElementById("cityInput").addEventListener("keydown", e=>{
  if(e.key === "Enter"){
    const q = document.getElementById("cityInput").value.trim();
    if(q){ lastCity = q; getWeather(q); }
  }
});

document.getElementById("refreshBtn").addEventListener("click", ()=>{
  if(!lastCity) return showToast("Belum ada kota yang dipilih", "text-bg-warning");
  getWeather(lastCity);
});

document.getElementById("unitSelect").addEventListener("change", function(){
  isCelsius = this.value === "metric";
  saveSettings();
  if(lastCity) getWeather(lastCity);
});

document.getElementById("toggleTheme").addEventListener("click", ()=>{
  document.body.classList.toggle("dark-mode");
  saveSettings();
});


setInterval(()=>{ if(lastCity) getWeather(lastCity); }, 300000);

(function init(){
  renderFavoriteList();
  if(favoriteCities.length){
    lastCity = favoriteCities[0];
    getWeather(lastCity);
  } else {
    lastCity = "Jakarta";
    getWeather(lastCity);
  }
})();

const autoToggle = document.getElementById("autoUpdateToggle");
const autoInterval = document.getElementById("autoUpdateInterval");
const btnSaveCurrent = document.getElementById("saveCurrentCityBtn");
const btnClearFav = document.getElementById("clearFavoritesBtn");

let autoEnabled = localStorage.getItem("auto_enabled") === "true";
let autoDelay = parseInt(localStorage.getItem("auto_delay") || 5);

autoToggle.checked = autoEnabled;
autoInterval.value = autoDelay;

autoToggle.addEventListener("change", () => {
    autoEnabled = autoToggle.checked;
    localStorage.setItem("auto_enabled", autoEnabled);
});

autoInterval.addEventListener("change", () => {
    autoDelay = parseInt(autoInterval.value);
    localStorage.setItem("auto_delay", autoDelay);
});

setInterval(() => {
    if (autoEnabled && lastCity) {
        getWeather(lastCity);
        document.getElementById("debugUpdated").textContent =
            new Date().toLocaleTimeString("id-ID");
    }
}, 60000); 


btnSaveCurrent.addEventListener("click", () => {
    if (!lastCity) return;
    addFavorite(lastCity);
});


btnClearFav.addEventListener("click", () => {
    favoriteCities = [];
    saveFavorites();
    renderFavoriteList();
    showToast("Semua favorit dihapus", "text-bg-warning");
});


setInterval(() => {
    document.getElementById("debugCity").textContent = lastCity || "-";
}, 1000);
