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
  numeroInicial: number = 1;
  numeroFinal: number = 2;
  bloquearForm: boolean = false;
  numerosSorteados: number[] = [];
  numeros: number[] = [];
  numeroAtual: number = 0;
  posicaoAtual: number = 0;

  constructor(private telaService: TelaService) { }

  ngOnInit(): void {
    this.telas = this.telaService.buscar();
  }

  formValid(): boolean {
    const numeros = this.numeroFinal > this.numeroInicial && this.numeroInicial > 0;
    const tela = this.telaSelecionada.length > 0;
    return numeros && tela;
  }

  listarNumeros(): void {
    for(let i = this.numeroInicial; i <= this.numeroFinal; i++) {
      this.numeros.push(i);
    }
  }

  sortear(): void {
    const tempoAleatorio = Math.floor(Math.random() * (1000 - 300 + 1)) + 300;
    let countMilissegundos = 0;
    
    if(this.numeros.length > 1) {
      const sorteio = setInterval(() => {
        this.posicaoAtual++;// Sortear
  
        console.log(this.posicaoAtual);
        
        if(this.posicaoAtual > this.numeros.length - 1) {
          this.posicaoAtual = 0;
        }// Voltar para o início
  
        this.numeroAtual = this.numeros[this.posicaoAtual];
  
        countMilissegundos++;
        if(countMilissegundos == tempoAleatorio) {
          clearInterval(sorteio);
        }// Parar sorteio
      },1);
  
      this.numerosSorteados.push(this.numeroAtual);
      this.numeros = this.numeros.filter((num: number) => num != this.numeroAtual);
    }
    else if(this.numeros.length == 1) {
      this.numeroAtual = this.numeros[0];
      this.numerosSorteados.push(this.numeroAtual);
      this.numeros = [];
    }
  }

  resetarForm(): void {
    this.numeroAtual = 0;
    this.posicaoAtual = 0;
    this.numeroInicial = 1;
    this.numeroFinal = 2;
    this.bloquearForm = false;
    this.numeros = [];
    this.numerosSorteados = [];
    this.telaSelecionada = [];
  }

  onSubmit(form: any): void {
    if(this.formValid()) {
      this.bloquearForm = true;
      const primeiraVez = this.numeros.length <= 0 && this.numerosSorteados.length <= 0;

      if(primeiraVez) {
        this.listarNumeros();
        setTimeout(() => {
          this.sortear();
        },500);
      }
      else {
        this.sortear();
      }
    }
    else {
      alert('Número final menor que o inicial ou número inicial menor que 0!');
    }
  }
}
