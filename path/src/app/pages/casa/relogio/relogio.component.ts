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

    if(tipo == 'tempo') {
      for(let telaExistente of this.telas) {
        for(let telaCriada of telas) {
          if(telaExistente.numero == telaCriada) {

            if(telaExistente.icone === 'access_time' || telaExistente.icone === 'timer') {

              this.telaService.navegar("tela", [telaExistente.numero]);
                const retorno = `${telaCriada},${this.minutos}`;
                setTimeout(() => {
                  this.telaService.navegar("tempo", [telaExistente.numero]);
                  this.configurarTempo(retorno);
                },2000);
                
            }// Se for uma tela de relogio recarregar para não enviar mais de um localStorage por vez
            else {
              this.configurarTempo(`${telaCriada},${this.minutos}`);
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
    const telas: number[] = form.value.telas == 'todas' ? this.telas.map((tela: Tela) => tela.numero) : form.value.telas;
    const tipo: string = form.value.tipo;
    this.carregarPagina(tipo, telas);
    this.limparForm();
  }
}
