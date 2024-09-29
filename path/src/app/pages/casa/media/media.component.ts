import { Component, inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { Tela } from 'src/app/models/Tela';
import { TelaService } from 'src/app/services/tela.service';
import { FilesComponent } from 'src/app/templates/files/files.component';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  telaSelecionada: string[] = [];
  telas: Tela[] = [];
  private _bottomSheet = inject(MatBottomSheet);

  constructor(private telaService: TelaService) { }

  ngOnInit(): void {
    this.telas = this.telaService.buscar();
  }

  toggleTodasTelas(ativar: boolean): void {
    ativar ? this.telaSelecionada = ['todas'] : this.telaSelecionada = this.telaSelecionada.filter((tela: string) => tela !== 'todas');
  }

  openBottomSheet(): void {
    this._bottomSheet.open(FilesComponent);
  }
}
