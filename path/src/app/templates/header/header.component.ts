import { Component, OnInit } from '@angular/core';

import { Header } from 'src/app/models/Header';
import { HeaderService } from 'src/app/services/header.service';
import { TemaService } from 'src/app/services/tema.service';

@Component({
  selector: 'path-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  temaClaro: boolean = true;
  temaColorido: boolean = false;

  constructor(
    readonly headerService: HeaderService,
    private temaService: TemaService
  ) {};

  ngOnInit(): void {
    const temaSalvo = this.temaService.buscarTemaAtual();
    this.temaClaro = temaSalvo == 'claro' || temaSalvo == 'classicRosa' ? true : false;
    this.temaColorido = temaSalvo == 'classicAzul' || temaSalvo == 'classicRosa' ? true : false;
  }

  get header(): Header[] {
    return this.headerService.buscarHeader;
  }

  configTema(): void {
    let tema = 
    this.temaClaro ? 
      this.temaColorido ? 
        'classicRosa' : 
        'claro' : 
      this.temaColorido ? 
        'classicAzul' : 
        'escuro';
    this.temaService.configTema(tema);
  }
}
