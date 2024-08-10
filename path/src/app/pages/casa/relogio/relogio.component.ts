import { Component, OnInit } from '@angular/core';

import { TelaService } from '../../../services/tela.service';
import { Tela } from '../../../models/Tela';

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

  constructor(private telaService: TelaService) { }

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

  configurarTempo(telas?: number[]) {
    if(telas) {
      const retorno = `${telas},${this.minutos}`;
      this.telaService.recarregar(telas);
      setTimeout(() => {
        localStorage.setItem("tempo", retorno);
      }, 5000); // 5 segundos para enviar a configuração do tempo
    }
    else {
      console.error('Selecione uma tela.')
    }
  }

  onSubmit(form: any): void {
    let telas: number[] | 'todas' = form.value.telas;
    const tipo: string = form.value.tipo;

    if(telas) {
      if(telas == 'todas') {
        telas = this.telas.map((tela: Tela) => tela.numero);
      }// Se todas as telas 

      this.telaService.navegar(tipo, telas); // Navegar para tela selecionada

      if(tipo == 'tempo') {
        this.configurarTempo(telas);
      }// Se for temporizador
    }
    else {
      console.error('Selecione uma tela.')
    }
    this.limparForm();
  }
}
