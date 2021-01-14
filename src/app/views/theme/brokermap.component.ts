import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  templateUrl: 'brokermap.component.html'
})
export class BrokermapComponent implements OnInit {

  name = 'Angular 5';
  lat:any;
  lng:any;

  constructor(){
    if (navigator) {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }

  ngOnInit(): void {
  }

 

}
