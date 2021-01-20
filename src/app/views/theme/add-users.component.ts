import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { AppServiceService } from './../../app-service.service';

@Component({
  templateUrl: 'add-users.component.html'
})
export class AddUsersComponent implements OnInit {

  user_id: number;
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
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone_no: ['', Validators.required],
      qualifications: ['', Validators.required],
      address: ['', Validators.required],
      banks: ['', Validators.required],
      about_me: ['', Validators.required]      
    });

    this.activatedRoute.queryParams.subscribe(params => {
        if(params['broker_id'] != undefined){
            this.appService.brokerProfile({id : params['broker_id']}).subscribe(res => {
                this.user_id = res['data'].id;
                let full_name = res['data'].name.split(" ");
                this.userForm.controls.first_name.setValue(full_name[0]);
                this.userForm.controls.last_name.setValue(full_name[1]);
                this.userForm.controls.email.setValue(res['data'].email);
                this.userForm.controls.phone_no.setValue(res['data'].phone_no);
                this.userForm.controls.qualifications.setValue(res['data'].qualifications);
                this.userForm.controls.address.setValue(res['data'].address);
                this.userForm.controls.banks.setValue(res['data'].banks);
                this.userForm.controls.about_me.setValue(res['data'].about_me);
                this.address = res['data'].address;
                this.latitude = res['data'].latitude;
                this.longitude = res['data'].longitude;
            });
        }else{
                this.user_id = 0;
        }
    });

    // this.userForm.controls.first_name.setValue('aaaaa');




// password: ['', Validators.required],

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
      name : this.userForm.get('first_name').value+' '+this.userForm.get('last_name').value,
      email : this.userForm.get('email').value,
      phone_no : this.userForm.get('phone_no').value,
      qualifications : this.userForm.get('qualifications').value,
      banks : this.userForm.get('banks').value,
      about_me : this.userForm.get('about_me').value,
      roll_id : 2,
      latitude : this.latitude,
      longitude : this.longitude,
      address : this.address
    }
    if(this.user_id){
        this.appService.updateUsers(obj,this.user_id).subscribe(data => {
          this.router.navigate(['theme/broker']);
        });
    }else{
        this.appService.addUsers(obj).subscribe(data => {
          this.router.navigate(['theme/broker']);
        });
    }
      
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