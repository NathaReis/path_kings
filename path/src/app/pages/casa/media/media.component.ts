import { Component, OnInit } from '@angular/core';

import { Tela } from 'src/app/models/Tela';
import { TelaService } from 'src/app/services/tela.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  telaSelecionada: string[] = [];
  telas: Tela[] = [];
  media: string = 'none';

  constructor(private telaService: TelaService) { }

  ngOnInit(): void {
    this.telas = this.telaService.buscar();
  }

  toggleTodasTelas(ativar: boolean): void {
    ativar ? this.telaSelecionada = ['todas'] : this.telaSelecionada = this.telaSelecionada.filter((tela: string) => tela !== 'todas');
  }
}
