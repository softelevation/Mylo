import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from './../../app-service.service';

@Component({
  templateUrl: 'add-users.component.html'
})
export class AddUsersComponent implements OnInit {

  userForm: FormGroup;
  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppServiceService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone_no: ['', Validators.required],
      address: ['', Validators.required]
    });


    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();

          this.getAddress( this.latitude, this.longitude);
          this.zoom = 12;
        });
      });
    });
  }


  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    // console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      // console.log(results);
      // console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          // return results;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  addUser() {

    let obj = {
      name : this.userForm.get('name').value,
      email : this.userForm.get('email').value,
      password : this.userForm.get('password').value,
      phone_no : this.userForm.get('phone_no').value,
      roll_id : 2,
      latitude : this.latitude,
      longitude : this.longitude,
      address : this.address
    }

      this.appService.addUsers(obj).subscribe(data => {
          this.router.navigate(['theme/broker']);
      });
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

}