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
  telas: Tela[] = [];
  telaSelecionada: string[] = [];
  numeroInicial: number = 0;
  numeroFinal: number = 0;
  bloquearForm: boolean = false;
  numerosSorteados: number[] = [];
  numeros: number[] = [];
  numeroAtual: number = 0;

  constructor(private telaService: TelaService) { }

  ngOnInit(): void {
    this.telas = this.telaService.buscar();
  }

  sortear(): void {
    const tempoAleatorio = Math.floor(Math.random() * (1000 - 300 + 1)) + 300;
    let countMilissegundos = 0;
    this.numeroAtual = 0;
    const sorteio = setInterval(() => {
      this.numeroAtual++
      countMilissegundos++;
      if(countMilissegundos == tempoAleatorio) {
        clearInterval(sorteio);
      }
    },1);
  }

  onSubmit(form: any): void {
    this.bloquearForm = true;
    this.sortear();
  }
}
