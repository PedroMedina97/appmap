import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Carga y muestra el GeoJSON
    fetch('assets/grados.geojson')
      .then(response => response.json())
      .then((data: any) => {
        L.geoJSON(data, {
          style: function (feature) {
            return { color: 'green', weight: 2 }; // Estilo de las geometrías
          }
        }).addTo(map);
        map.fitBounds(L.geoJSON(data).getBounds()); // Ajusta automáticamente la vista para mostrar todo el GeoJSON
      })
      .catch(error => {
        console.error('Error loading GeoJSON:', error);
      });
  }
}
