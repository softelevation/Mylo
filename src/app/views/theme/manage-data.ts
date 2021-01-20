import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ManageData {

  returndata: any;

  transform(input,id){
    this.returndata = input;
    const index: number = input.findIndex(x => x.id ===id);
    console.log(index);
    if (index !== -1) {
      this.returndata = input.splice(index, 1);
    }
    return this.returndata;
  }
}