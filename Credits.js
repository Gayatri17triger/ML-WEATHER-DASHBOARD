
import React from "react";

export default function Credits() {
  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>Data Providers</h1>
      <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
        <li style={{ marginBottom: "12px" }}>
          Current conditions provided by <strong>Foreca</strong>
        </li>
        <li style={{ marginBottom: "12px" }}>
          Wind, Temperature, and Precipitation maps are based on data and
          products of the{" "}
          <strong>
            European Centre for Medium-range Weather Forecasts (ECMWF)
          </strong>
        </li>
        <li style={{ marginBottom: "12px" }}>
          Other map data provided by <strong>Foreca</strong>
        </li>
        <li style={{ marginBottom: "12px" }}>
          Temperature forecasts are based on data from <strong>Foreca</strong>{" "}
          and <strong>ECMWF</strong>.
        </li>
        <li style={{ marginBottom: "12px" }}>
          Japanese weather products: Data ©{" "}
          <a
            href="https://www.jma.go.jp/jma/indexe.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Japan Meteorological Agency
          </a>{" "}
          and © Weather Service, Ltd. Maps graphical design by © Foreca, Ltd.
        </li>
        <li style={{ marginBottom: "12px" }}>
          Current conditions, forecasts, air quality and maps for locations in
          China by{" "}
          <a
            href="http://www.cma.gov.cn/en2014/"
            target="_blank"
            rel="noopener noreferrer"
          >
            China Meteorological Administration (中国天气网)
          </a>
        </li>
        <li style={{ marginBottom: "12px" }}>
          Current conditions, forecasts, and maps for locations in Korea by{" "}
          <a
            href="https://www.kweather.co.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kweather
          </a>
        </li>
        <li style={{ marginBottom: "12px" }}>
          Canadian radar map data by <strong>Environment Canada</strong>
        </li>
        <li style={{ marginBottom: "12px" }}>
          Lightning data provided by{" "}
          <a
            href="https://www.nowcast.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nowcast.de
          </a>
        </li>
        <li style={{ marginBottom: "12px" }}>
          Tides data provided by{" "}
          <a
            href="https://oceanservice.noaa.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NOAA’s National Ocean Service
          </a>
        </li>
        <li style={{ marginBottom: "12px" }}>
          Historical weather data provided by{" "}
          <a
            href="https://www.weathertrends360.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            weathertrends360
          </a>
        </li>
        <li style={{ marginBottom: "12px" }}>
          Air Quality Data provided by{" "}
          <a
            href="https://www.airnow.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Airnow.gov
          </a>
          ,{" "}
          <a
            href="https://atmosphere.copernicus.eu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CAMS
          </a>
          ,{" "}
          <a
            href="https://openaq.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAQ
          </a>
          , and{" "}
          <a
            href="https://cpcb.nic.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CPCB
          </a>
        </li>
        <li style={{ marginBottom: "12px" }}>
          Earthquake data provided by{" "}
          <a
            href="https://www.usgs.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            U.S. Geological Survey
          </a>
        </li>
        <li style={{ marginBottom: "12px" }}>
          Governmental weather warnings in Europe: data for France from{" "}
          <a
            href="https://meteofrance.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Météo-France
          </a>{" "}
          and English warning text for France from{" "}
          <a
            href="https://www.meteoalarm.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MeteoAlarm
          </a>
          , data for Spain from AEMET, data for Germany from DWD, data for
          Finland from FMI Open Data. Other European countries from{" "}
          <a
            href="https://www.meteoalarm.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MeteoAlarm
          </a>
          .
        </li>
      </ul>
    </div>
  );
}
