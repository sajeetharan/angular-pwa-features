import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  //function to convert from JSON to MAP
  object_to_map(objStr) {
    const obj = JSON.parse(objStr);
    const mp = new Map();
    Object.keys(obj).forEach(key => { 
      mp.set(key, obj[key]) 
    });
    return mp;
  }
  
  //function to convert from MAP to JSON
  map_to_object(map) {
    const obj = {};
    map.forEach ((value,key) => { 
      obj[key] = value 
    });
    return JSON.stringify(obj); 
  }

}
