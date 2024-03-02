import React from "react";
import "../App.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import * as MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

import {
  RulerControl,
  StylesControl,
  CompassControl,
  ZoomControl,
} from "mapbox-gl-controls";
import "mapbox-gl-controls/lib/controls.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXJ1bmFsMTIzNDU2Nzg5IiwiYSI6ImNsbWhzbWF2cTBzajAzcXIybTVoa3g1anQifQ.66Fu05Ii8-NVd-w-C-FSgA";
// "pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g";

class PolyLineComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v10",
      center: [73.867204, 18.470839],
      zoom: 12,
    });
    console.log("polypoints", this.props);
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });
    if (this.props.polyPoints.length > 0) {
      // new mapboxgl.Marker([
      //   this.props.polyPoints[0].latitude,
      //   this.props.polyPoints[0].longitude,
      // ])
      //   .setLngLat([
      //     this.props.polyPoints[0].latitude,
      //     this.props.polyPoints[0].longitude,
      //   ])
      //   .addTo(map);

      this.props.polyPoints.map((data, i) => {
        new mapboxgl.Marker([data.lattitude, data.longitude])
          .setLngLat([data.longitude, data.lattitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(`<h3>${i}</h3><p>${data.latitude}</p>`)
          )
          .addTo(map);
      });
    }
    // map.on("load", function () {
    //   directions.setOrigin("Toronto, Ontario"); // On load, set the origin to "Toronto, Ontario".
    //   directions.setDestination("Montreal, Quebec"); // On load, set the destination to "Montreal, Quebec".
    // });

    var createGeoJSONCircle = function (center, radiusInKm, points) {
      if (!points) points = 64;

      var coords = {
        latitude: center[1],
        longitude: center[0],
      };

      var km = radiusInKm;

      var ret = [];
      var distanceX =
        km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
      var distanceY = km / 110.574;

      var theta, x, y;
      for (var i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);

        ret.push([coords.longitude + x, coords.latitude + y]);
      }
      ret.push(ret[0]);

      return {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [ret],
              },
            },
          ],
        },
      };
    };

    map.on("load", () => {
      console.log("map loaded");

      map.addSource("polygon", createGeoJSONCircle([72.894294, 19.050412], 4));

      map.addLayer({
        id: "polygon",
        type: "fill",
        source: "polygon",
        layout: {},
        paint: {
          "fill-color": "blue",
          "fill-opacity": 0.6,
        },
      });

      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: this.props.arr,
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 8,
        },
      });
    });

    // Styles
    map.addControl(new StylesControl(), "bottom-left");

    // Compass
    map.addControl(new CompassControl(), "top-right");

    // Zoom
    map.addControl(new ZoomControl(), "top-right");
  }
  render() {
    return <div className="mapWrapper" id="map" />;
  }
}
export default PolyLineComponent;
