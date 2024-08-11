import { Component, OnInit } from '@angular/core';

import { TelaService } from '../../../services/tela.service';
import { Tela } from '../../../models/Tela';
import { RelogioService } from 'src/app/services/relogio.service';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['./relogio.component.scss']
})
export class RelogioComponent implements OnInit {
  telaSelecionada: string[] = [];
  tipoSelecionado = 'relogio';
  minutos = '';
  telas: Tela[] = [];

  constructor(
    private telaService: TelaService,
    private relogioService: RelogioService
  ) { }

  ngOnInit(): void {
    this.telas = this.telaService.buscar();
  }

  toggleTodasTelas(ativar: boolean): void {
    ativar ? this.telaSelecionada = ['todas'] : this.telaSelecionada = this.telaSelecionada.filter((tela: string) => tela !== 'todas');
  }

  limparForm(): void {
    this.telaSelecionada = [];
    this.tipoSelecionado = 'relogio';
    this.minutos = '';
  }

  carregarPagina(tipo: string, telas: number[]): void {
    this.telaService.navegar(tipo, telas); // Navegar para tela selecionada

    for(let telaExistente of this.telas) {
      for(let telaCriada of telas) {
        if(telaExistente.numero == telaCriada) {
          if(telaExistente.icone === 'access_time' || telaExistente.icone === 'timer') {
            this.telaService.recarregar([telaExistente.numero]);
            if(tipo == 'tempo') {
              const retorno = `${telaCriada},${this.minutos}`;
              setTimeout(() => {
                this.configurarTempo(retorno);
              },3000);
            }
          }// Se for uma tela de relogio recarregar para não enviar mais de um localStorage por vez
          else {
            if(tipo == 'tempo') {
              const retorno = `${telaCriada},${this.minutos}`;
              this.configurarTempo(retorno);
            }
          }
        }
      }
    }
  }

  configurarTempo(retorno: string): void {
    localStorage.setItem("tempo", retorno);
  }

  get relogios(): { [key: number]: string } {
    return this.relogioService.getAllRelogios();
  }

  onSubmit(form: any): void {
    let telas: number[] | 'todas' = form.value.telas;
    const tipo: string = form.value.tipo;

    if(telas) {
      if(telas == 'todas') {
        telas = this.telas.map((tela: Tela) => tela.numero);
      }// Se todas as telas 

      this.carregarPagina(tipo, telas);
    }
    else {
      console.error('Selecione uma tela.')
    }
    this.limparForm();
  }
}
