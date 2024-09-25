import { Injectable } from '@angular/core';
import { Header } from '../models/Header';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  pages: Header[] = [
    {
      rota: '/casa',
      icon: 'home',
      class: 'logo',
      nome: 'Casa'
    },
    {
      rota: '/casa/relogio',
      icon: 'access_time',
      nome: 'tempo'
    },
    {
      nome: 'sorteio',
      rota: '/casa/sorteio',
      icon: 'casino'
    },
    {
      nome: 'media',
      rota: '/casa/media',
      icon: 'audiotrack'
    }
  ]

  get buscarHeader(): Header[] {
    return this.pages;
  }
}
