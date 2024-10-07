import { Injectable } from '@angular/core';
import { Header } from '../models/Header';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  pages: Header[] = [
    {
      icon: 'home',
      rota: 'casa',
      class: 'logo',
      nome: 'Casa'
    },
    {
      icon: 'access_time',
      rota: '/relogio',
      nome: 'tempo'
    },
    {
      nome: 'sorteio',
      rota: '/sorteio',
      icon: 'casino'
    },
    {
      nome: 'media',
      rota: '/media',
      icon: 'audiotrack'
    }
  ]

  get buscarHeader(): Header[] {
    return this.pages;
  }
}
