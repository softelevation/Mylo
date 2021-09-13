import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from "@angular/core";
import { MapsAPILoader, MouseEvent } from "@agm/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AppServiceService } from "./../../app-service.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "./../../../environments/environment";

@Component({
  templateUrl: "add-users.component.html",
})
export class AddUsersComponent implements OnInit {
  serverUrl = environment.API;
  user_id: number;
  userForm: FormGroup;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  // rating: number;
  // ratings_icons = ["", "", "", "", ""];
  is_valid_email = false;
  add_broker = "Add Broker";
  public imagePath;
  imgURL: string;
  imgURL_name: any;
  public message: string;
  private geoCoder;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppServiceService,
    private mapsAPILoader: MapsAPILoader,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.imgURL = "http://i.pravatar.cc/500?img=7";
    this.userForm = this.fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      phone_no: ["", Validators.required],
      qualifications: ["", Validators.required],
      address: ["", Validators.required],
      banks: ["", Validators.required],
      about_me: ["", Validators.required],
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params["broker_id"] != undefined) {
        this.add_broker = "Edit Broker";
        this.appService
          .brokerProfile({ id: params["broker_id"] })
          .subscribe((res) => {
            this.user_id = res["data"].id;
            let full_name = res["data"].name.split(" ");
            this.userForm.controls.first_name.setValue(full_name[0]);
            this.userForm.controls.last_name.setValue(full_name[1]);
            this.userForm.controls.email.setValue(res["data"].email);
            this.userForm.controls.phone_no.setValue(res["data"].phone_no);
            this.userForm.controls.qualifications.setValue(
              res["data"].qualifications
            );
            this.userForm.controls.address.setValue(res["data"].address);
            this.userForm.controls.banks.setValue(res["data"].banks);
            this.userForm.controls.about_me.setValue(res["data"].about_me);
            this.address = res["data"].address;
            this.latitude = res["data"].latitude;
            this.longitude = res["data"].longitude;
            this.rating = res["data"].rating;
            if (res["data"].image) {
              this.imgURL = this.serverUrl + res["data"].image;
            }
          });
      } else {
        this.user_id = 0;
      }
    });

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
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

          this.getAddress(this.latitude, this.longitude);
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    if ("geolocation" in navigator) {
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
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  isCollapsed: boolean = false;
  iconCollapse: string = "icon-arrow-up";

  email_valid_check() {
    this.is_valid_email = true;
  }

  get inputbroker() {
    return this.userForm.controls;
  }

  addUser() {
    let obj = {
      name:
        this.userForm.get("first_name").value +
        " " +
        this.userForm.get("last_name").value,
      email: this.userForm.get("email").value,
      phone_no: this.userForm.get("phone_no").value,
      qualifications: this.userForm.get("qualifications").value,
      banks: this.userForm.get("banks").value,
      about_me: this.userForm.get("about_me").value,
      roll_id: 2,
      latitude: this.latitude,
      longitude: this.longitude,
      address: this.address,
      // rating: this.rating,
    };
    const formData = new FormData();
    formData.append(
      "name",
      this.userForm.get("first_name").value +
        " " +
        this.userForm.get("last_name").value
    );
    formData.append("email", this.userForm.get("email").value);
    formData.append("phone_no", this.userForm.get("phone_no").value);
    formData.append(
      "qualifications",
      this.userForm.get("qualifications").value
    );
    formData.append("banks", this.userForm.get("banks").value);
    formData.append("about_me", this.userForm.get("about_me").value);
    formData.append("roll_id", "2");
    formData.append("latitude", obj.latitude);
    formData.append("longitude", obj.longitude);
    formData.append("address", obj.address);
    // if (obj.rating != null) {
    //   formData.append("rating", obj.rating);
    // }
    if (this.imgURL_name && this.imgURL_name != "undefined") {
      formData.append("image", this.imgURL_name);
    }
    if (this.user_id) {
      this.appService.updateUsers(formData, this.user_id).subscribe((data) => {
        if (data.status) {
          this.router.navigate(["broker"]);
          this.toastr.success("Broker update successfully", "Success");
        } else {
          this.toastr.error(data.message, "Error");
        }
      });
    } else {
      this.appService.addUsers(formData).subscribe((data) => {
        if (data.status) {
          this.router.navigate(["broker"]);
          this.toastr.success("Broker add successfully", "Success");
        } else {
          this.toastr.error(data.message, "Error");
        }
      });
    }
  }

  previewFile(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    // console.log(files[0]);
    this.imgURL_name = files[0];
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  // changeReting(input, val) {
  //   this.ratings_icons = ["", "", "", "", ""];
  //   this.rating = input;
  //   for (let index = 0; index < input + 1; index++) {
  //     this.ratings_icons[index] = "ratings-icons";
  //   }
  // }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? "icon-arrow-down" : "icon-arrow-up";
  }
}
