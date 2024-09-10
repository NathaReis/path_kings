import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Media } from '../models/Media';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SorteioService {
  
  constructor(private http: HttpClient) {}
  
  getArquivosPath(): Observable<any> {
    return new Observable((observer) => {
      this.http.get<any>(`http://localhost:3000/sorteio`).subscribe({
        next: (value: Media[]) => observer.next(value),
        error: (error) => observer.error(error)
      });
    });
  } 
}