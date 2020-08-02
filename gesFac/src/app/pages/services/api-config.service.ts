import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  public REST_API_SERVER = 'http://localhost:8080';
  constructor() { }
}
