import { Component, OnInit } from '@angular/core';

import { Media } from 'src/app/models/Media';
import { Tela } from 'src/app/models/Tela';
import { SorteioService } from 'src/app/services/sorteio.service';
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
  numerosNaoSorteados: number[] = [];
  numeros: number[] = [];
  numeroAtual: number = 0;
  posicaoAtual: number = 0;
  sorteando: boolean = false;
  sourceAudio: string = '';
  sourceAudioFim: string = '';
  songIcon: string = 'volume_off';
  volume: number = 0;

  constructor(
    private telaService: TelaService,
    private sorteioService: SorteioService
  ) { }

  ngOnInit(): void {
    this.telas = this.telaService.buscar();
    this.recuperarEstadoAtual();
    this.sorteioService.getArquivosPath().subscribe({
      next: (value: Media[]) => {
        const suspense = value.find((media: Media) => media.categoria == 'inicio')?.dados;
        const fim = value.find((media: Media) => media.categoria == 'fim')?.dados;

        if(suspense && fim) {
          this.sourceAudio = suspense;
          this.sourceAudioFim = fim;
        }
      },
      error: (error: any) => console.log(error)
    })
  }

  navegar(): void {
    const numeros = this.telaSelecionada.map((el: string) => Number(el));
    this.telaService.navegar('sorteio',numeros);
  }

  salvarEstadoAtual(): void {
    sessionStorage.setItem("telas_sorteio", `${this.telaSelecionada.join(",")}`);
    sessionStorage.setItem("numeros_sorteio", `${this.numeros.join(",")}`);
    sessionStorage.setItem("numerosNaoSorteados_sorteio", `${this.numerosNaoSorteados.join(",")}`);
    sessionStorage.setItem("numerosSorteados_sorteio", `${this.numerosSorteados.join(",")}`);
  }

  recuperarEstadoAtual(): void {
    const t = sessionStorage.getItem("telas_sorteio");
    const n = sessionStorage.getItem("numeros_sorteio");
    const nNS = sessionStorage.getItem("numerosNaoSorteados_sorteio");
    const nS = sessionStorage.getItem("numerosSorteados_sorteio");
    const possuiSession = t && n && nNS && nS;
    const primeiraVez = this.numerosNaoSorteados.length <= 0 && this.numerosSorteados.length <= 0;
    
    if(possuiSession && primeiraVez) {
      this.bloquearForm = true;

      this.telaSelecionada = t.split(",");
      this.numeros = n.split(",").map((num: string) => +num);
      this.numerosNaoSorteados = nNS.split(",").map((num: string) => +num);
      this.numerosSorteados = nS.split(",").map((num: string) => +num);
      this.numeroInicial = this.numeros[0];
      this.numeroFinal = this.numeros.unshift();
    }
  }

  formValid(): boolean {
    const numeros = this.numeroFinal > this.numeroInicial && this.numeroInicial > 0;
    const tela = this.telaSelecionada.length > 0;
    return numeros && tela;
  }

  listarNumeros(): void {
    for(let i = this.numeroInicial; i <= this.numeroFinal; i++) {
      this.numerosNaoSorteados.push(i);
      this.numeros.push(i);
    }
  }

  transferirNumero(numero: number) {
    const numeroSorteado = this.numerosSorteados.includes(numero);
    if(numeroSorteado) {
      this.numerosSorteados = this.numerosSorteados.filter((num: number) => num != numero);
      this.numerosNaoSorteados.push(numero);
      this.numerosNaoSorteados.sort((a,b) => a < b ? -1 : 1);
    }
    else {
      this.numerosNaoSorteados = this.numerosNaoSorteados.filter((num: number) => num != numero);
      this.numerosSorteados.push(numero);
      this.numerosSorteados.sort((a,b) => a < b ? -1 : 1); 
    }
  }

  ordenarListas() : void {
    this.numerosSorteados = this.numerosSorteados.filter((num: number) => num != 0);
    this.numerosNaoSorteados = this.numerosNaoSorteados.filter((num: number) => num != 0);

    this.numerosSorteados.sort((a,b) => a < b ? -1 : 1); 
    this.numerosNaoSorteados.sort((a,b) => a < b ? -1 : 1);
  }

  setVolume(): void {
    this.volume = this.songIcon == 'volume_up' ? 0 : 0.5;
    this.songIcon = this.songIcon == 'volume_up' ? 'volume_off' : 'volume_up';
  }

  efeitoSonoro(play: boolean): void {
    const $suspense: any = document.querySelector("#suspense");
    const $fim: any = document.querySelector("#fim");

    play ? $fim.pause() : $fim.play();
    play ? $suspense.play() : $suspense.pause();
    $fim.currentTime = 0;
    $suspense.currentTime = 0;
    this.sorteando = play;
  }

  sortear(): void {

    const tempoAleatorio = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
    let countMilissegundos = 0;
    
    if(this.numerosNaoSorteados.length > 1) {
      this.efeitoSonoro(true);

      const sorteio = setInterval(() => {
        this.posicaoAtual++;// Sortear
          
        if(this.posicaoAtual > this.numerosNaoSorteados.length - 1) {
          this.posicaoAtual = 0;
        }// Voltar para o início
  
        this.numeroAtual = this.numerosNaoSorteados[this.posicaoAtual];
        localStorage.setItem("sorteio", `${this.telaSelecionada},${this.numeroAtual}`);

        countMilissegundos++;
        if(countMilissegundos == tempoAleatorio) {
          clearInterval(sorteio);
          this.efeitoSonoro(false);
        }// Parar sorteio
      },10);
  
      this.numerosSorteados.push(this.numeroAtual);
      this.numerosNaoSorteados = this.numerosNaoSorteados.filter((num: number) => num != this.numeroAtual);
      this.salvarEstadoAtual();
    }
    else if(this.numerosNaoSorteados.length == 1) {
      this.numeroAtual = this.numerosNaoSorteados[0];
      this.numerosSorteados.push(this.numeroAtual);
      this.numerosNaoSorteados = [];
    }
    this.ordenarListas();
  }

  resetarForm(): void {
    this.numeroAtual = 0;
    localStorage.setItem("sorteio", `${this.telaSelecionada},${this.numeroAtual}`);
    this.posicaoAtual = 0;
    this.numeroInicial = 1;
    this.numeroFinal = 2;
    this.bloquearForm = false;
    this.numerosNaoSorteados = [];
    this.numerosSorteados = [];
    this.telaSelecionada = [];
    this.numeros = [];
  }

  onSubmit(form: any): void {
    if(this.formValid() && !this.sorteando) {
      this.numerosSorteados.sort((a,b) => a < b ? -1 : 1);
      this.numeros.sort((a,b) => a < b ? -1 : 1);
      this.numerosNaoSorteados.sort((a,b) => a < b ? -1 : 1);

      this.bloquearForm = true;
      const primeiraVez = this.numerosNaoSorteados.length <= 0 && this.numerosSorteados.length <= 0;

      if(primeiraVez) {
        this.navegar();
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
