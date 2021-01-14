import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './../../app-service.service';
import { Router } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  templateUrl: 'brokermap.component.html'
})
export class BrokermapComponent implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;

  ngOnInit(): void {
    this.setCurrentLocation();
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

}

interface getAllUsers {
  id: number;
  name: string;
  email: string;
  roll_id: string;
  status: string;
}