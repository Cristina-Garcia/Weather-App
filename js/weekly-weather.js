import { getWeeklyWeather } from "./services/weather.js";
import { getLatLon } from "./geolocation.js";
import { formatWeekList } from "./format-date.js";
import { createDOM } from "./dom.js";

function tabPanelTemplate(id) {
  return `<div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
            <div class="dayWeather" id="dayWeather-${id}">
              <ul class="dayWeather-list" id="dayWeather-list-${id}">
                Tab Panel
              </ul>
            </div>
          </div>`;
}
function configWeeklyWeather(weekList) {
  const $container = document.querySelector(".weeklyWeather");
  weekList.forEach((day, index) => {
    const $el = createDOM(tabPanelTemplate(index));
    // $el.textContent ='Hola mundo'
    // debugger;
    $container.append($el);
  });
}
export default async function weeklyWeather() {
  const { lat, lon, isError } = await getLatLon();
  if (isError) return console.log("Ha ocurrido un eror ubicandote");
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(
    lat,
    lon
  );
  if (weeklyWeatherError)
    return console.log("Ha ocurrido un error trayendo el pronóstico del clima");

  const weekList = formatWeekList(weather.list);

  configWeeklyWeather(weekList);
}
