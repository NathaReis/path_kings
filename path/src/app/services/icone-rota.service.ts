import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconeRotaService {
  iconeRota(rota: string): string {
    switch(rota) {
      case 'relogio':
        return 'access_time';
      case 'tempo':
        return 'timer';
      case 'tela':
        return 'villa';
      case 'sorteio':
        return 'casino';
      case 'media':
        return 'audiotrack';
      default: 
        return 'tv';
    }
  }
}
