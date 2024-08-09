import { Component, OnInit } from '@angular/core';

import { TelaService } from 'src/app/services/tela.service';
import { Tela } from 'src/app/models/Tela';

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
    const retorno = telas ? `${telas},${this.minutos}` : `local,${this.minutos}`;
    if(telas) {
      this.telaService.recarregar(telas);
    }
    else {
      this.telaService.recarregar('local');
    }
    setTimeout(() => {
      localStorage.setItem("tempo", retorno);
    }, 3000); // 3 segundos
  }

  onSubmit(form: any): void {
    let telas: number[] | 'todas' = form.value.telas;
    const tipo: string = form.value.tipo;

    if(telas) {
      if(telas == 'todas') {
        telas = this.telas.map((tela: Tela) => tela.numero);
        this.telaService.navegar(tipo, telas);
      }// Se todas as telas 
      else {
        this.telaService.navegar(tipo, telas);
      }// Se alguma(s) tela(s) 

      if(tipo == 'tempo') {
        this.configurarTempo(telas);
      }    
    }
    else {
      this.telaService.gerarTelaEspecifica(tipo);
      if(tipo == 'tempo') {
        this.configurarTempo();
      }   
    }// Se tela local
    this.limparForm();
  }
}
