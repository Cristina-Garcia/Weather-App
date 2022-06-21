import { getWeeklyWeather } from "./services/weather.js";
import { getLatLon } from "./geolocation.js";
import { formatWeekList } from "./format-date.js";
import { createDOM } from "./dom.js";
import { creatPeriodTime } from "./period-time.js";
import draggable from "./draggable.js";

function tabPanelTemplate(id) {
  return `
          <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
            <div class="dayWeather" id="dayWeather-${id}">
              <ul  class="dayWeather-list" id="dayWeather-list-${id}">
                
              </ul>
            </div>
          </div>
          `;
}
function createTabPanel(id) {
  const $panel = createDOM(tabPanelTemplate(id));
  if (id > 0) {
    $panel.hidden = true;
  }
  return $panel;
}
function configWeeklyWeather(weeklist) {
  // const $container = document.querySelector(".weeklyWeather");
  const $container = document.querySelector(".tabs");
  weeklist.forEach((day, index) => {
    const $panel = createTabPanel(index);

    // const $el=document.createElement('h2');
    // $el.textContent ='hola mundo'
    // $container.append($el)

    $container.append($panel);
    day.forEach((weather, indexWeather) => {
      $panel.querySelector(".dayWeather-list").append(creatPeriodTime(weather));
    });
  });
}

// function tabPanelSummaryDay(id) {
//   return `
//   <div class="daySummary" id="daySummary">
//             <p class="tempSummary-max">Máx: ${id}</p>
//             <p class="tempSummary-min">Min: ${id}</p>
//             <p class="summaryWind">Viento: ${id}</p>
//             <p class="summaryHumidity">Humedad: ${id}</p>
//   </div>`;
// }
// function createTabPanelSummaryDay(id) {
//   const $panelSummary = createDOM(tabPanelSummaryDay(id));
//   if (id > 0) {
//     $panelSummary.hidden = true;
//   }
//   return $panelSummary;
// }

// // function configWeeklyWeather(weeklist) {

// //   const $containerSummary = document.querySelector(".tabs");
// //   weeklist.forEach((day, index) => {
// //     const $panelSummary = createTabPanelDay(index);
// // }
// // }

export default async function weeklyWeather() {
  const $container = document.querySelector(".weeklyWeather");
  const { lat, lon, isError } = await getLatLon();
  if (isError) return console.log("Ha ocurrido un error ubicandote");
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(
    lat,
    lon
  );
  if (weeklyWeatherError)
    return console.log("Ha ocurrido un error trayendo el pronóstico del clima");

  const weeklist = formatWeekList(weather.list);

  configWeeklyWeather(weeklist);
  draggable($container);
}
