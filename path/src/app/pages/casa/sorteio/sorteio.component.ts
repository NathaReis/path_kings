import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tela } from 'src/app/models/Tela';
import { TelaService } from 'src/app/services/tela.service';

@Component({
  selector: 'app-sorteio',
  templateUrl: './sorteio.component.html',
  styleUrls: ['./sorteio.component.scss']
})
export class SorteioComponent implements OnInit {
  telaSelecionada: string[] = [];
  telas: Tela[] = [];
  numeroInicial: number = 0;
  numeroFinal: number = 0;
  numerosSorteados: number[] = [];

  constructor(private telaService: TelaService) { }

  ngOnInit(): void {
    this.telas = this.telaService.buscar();
  }

  toggleTodasTelas(ativar: boolean): void {
    ativar ? this.telaSelecionada = ['todas'] : this.telaSelecionada = this.telaSelecionada.filter((tela: string) => tela !== 'todas');
  }

  onSubmit(form: any): void {

  }
}
