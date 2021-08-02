import { Component, OnInit } from "@angular/core";
import { AppServiceService } from "./../../app-service.service";
import { Router } from "@angular/router";

@Component({
  styles: [
    'agm-map { height: 500px; /* height is required */ } #floating-panel {font-family: "Roboto", "sans-serif";}',
  ],
  templateUrl: "brokermap.component.html",
})
export class BrokermapComponent implements OnInit {
  lat = -33.878882;
  lng = 151.218855;
  selectedMarker;
  markers: [];

  ngOnInit(): void {
    this.appService.getAllBroker().subscribe((data: any) => {
      this.markers = data["data"];
    });
  }

  constructor(private appService: AppServiceService, private router: Router) {}

  // addMarker(lat: number, lng: number) {
  //   this.markers.push({ lat, lng, alpha: 0.4 });
  // }

  max(coordType: "lat" | "lng"): number {
    return Math.max(...this.markers.map((marker) => marker[coordType]));
  }

  min(coordType: "lat" | "lng"): number {
    return Math.min(...this.markers.map((marker) => marker[coordType]));
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude,
    };
  }

  // constructor(){
  //   if (navigator){
  //   navigator.geolocation.getCurrentPosition( pos => {
  //       this.lng = +pos.coords.longitude;
  //       this.lat = +pos.coords.latitude;
  //     });
  //   }
  // }

  // ngOnInit(): void {
  // }
}

// interface getAllUsers {
//   id: number;
//   name: string;
//   email: string;
//   latitude: number;
//   longitude: number;
//   address: string;
//   roll_id: string;
//   status: string;
// }
