import { Component, OnInit } from '@angular/core';

import { TelaService } from 'src/app/services/tela.service';
import { Tela } from 'src/app/models/Tela';


@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrls: ['./casa.component.scss']
})
export class CasaComponent implements OnInit {
  telas: Tela[] = [];

  constructor(private telaService: TelaService) {}

  ngOnInit(): void {
    this.buscarTelas();
  }

  buscarTelas(): void {
    this.telas = this.telaService.buscar();
  }

  voltarTela(numero: number): void {
    this.telaService.navegar('tela',[numero]);
  }
}
