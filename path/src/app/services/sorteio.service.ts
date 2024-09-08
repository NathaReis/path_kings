import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AmbienteService } from './ambiente.service';
import { Media } from '../models/Media';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SorteioService {
  
  constructor(
    private env: AmbienteService,
    private http: HttpClient
  ) {}
  
  getArquivosPath(): Observable<any> {
    return new Observable((observer) => {
      this.http.get<any>(`http://localhost:3000/sorteio`).subscribe({
        next: (value: Media[]) => observer.next(value),
        error: (error) => observer.error(error)
      });
    });
  } 
  
  getSomTambores(): Observable<any> {
    return new Observable((observer) => {
      this.getArquivosPath().subscribe({
        next: (value: Media[]) => observer.next(value.find((arquivo: Media) => arquivo.id == 1)),
        error: (error: any) => observer.error(error)
      });
    });
  } 
}