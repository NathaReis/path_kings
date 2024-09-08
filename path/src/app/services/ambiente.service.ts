import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {

  public baseJSON = 'http://localhost:3000';
  public baseSERVER = 'http://localhost:3003';
}