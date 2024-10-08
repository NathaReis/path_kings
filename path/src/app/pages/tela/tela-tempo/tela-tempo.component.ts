import { Component, OnInit } from '@angular/core';

import { GeoService } from '../../../services/geo.service';
import { Clima } from '../../../models/Clima';
import { TelaService } from 'src/app/services/tela.service';
import { Tela } from 'src/app/models/Tela';

@Component({
  selector: 'app-tela-tempo',
  templateUrl: './tela-tempo.component.html',
  styleUrls: ['./tela-tempo.component.scss']
})
export class TelaTempoComponent implements OnInit {
  id: string = '';
  clima: Clima = {src: '', cep: '', temperatura: '', descricao: ''};
  hora: string = '00';
  minuto: string = '00';
  segundo: string = '00';
  seg: number = 0;

  constructor(readonly geo: GeoService, private telaService: TelaService) { }

  ngOnInit(): void {
    // this.buscarClima();
  
    const idSaved = sessionStorage.getItem("id");
    if(idSaved) {
      this.id = idSaved;
    }

    this.buscarRegistro();
  }

  async buscarClima(): Promise<void> {
    this.clima = await this.geo.buscarClima();

    setTimeout(() => {
      this.buscarClima();
    }, 600000) // 10 minutos
  }

  formatarHora(hora: string): string {
    if(+hora < 10 && +hora >= 0) {
      return `0${+hora}`;
    }
    else if(+hora < 0 && +hora > -10) {
      const hr = +hora * -1;
      return `-0${hr}`;
    }
    return hora;
  }

  resetarTempo(): void {
    this.hora = '00';
    this.minuto = '00';
  }

  registrarTempo(hora: string, minuto: string, segundo: string): void {
    sessionStorage.setItem(`tempo_${this.id}`,`${hora}:${minuto}`);
    sessionStorage.setItem(`segundo_${this.id}`,segundo);
    localStorage.setItem(`tempo_status_${this.id}`,`${hora}:${minuto}:${segundo}`);
  }

  preencherTempo(hora: string, minuto: string, segundo: string): void {
    this.hora = hora;
    this.minuto = minuto;
    this.segundo = segundo;
  }

  renderizarTempo(hora: string, minuto: string, segundo: string): void {
    this.registrarTempo(this.formatarHora(hora),this.formatarHora(minuto),this.formatarHora(segundo));
    this.preencherTempo(this.formatarHora(hora),this.formatarHora(minuto),this.formatarHora(segundo));
  }

  resetContagem() {
    this.seg = 0;
    this.segundo = '00';
    this.minuto = '00';
    this.hora = '00';
  }

  contar(): void {
    this.seg = +this.segundo - 1;
    if(this.seg < 0) {
      if(+this.minuto > 0) {
        this.seg = 59;
        const decremento: number = +this.minuto - 1;
        this.minuto = this.formatarHora(String(decremento));
      }
      else if(+this.hora > 0) {
        this.seg = 59;
        this.minuto = '59';
        const decremento: number = +this.hora - 1;
        this.hora = this.formatarHora(String(decremento));
      }
      else {
        this.resetContagem();
      }
    }
    this.segundo = this.formatarHora(String(this.seg));

    this.renderizarTempo(this.hora,this.minuto,this.segundo);
  }

  buscarRegistro(): void {
    setTimeout(() => {
      const tempo = sessionStorage.getItem(`tempo_${this.id}`);
      const segundo = sessionStorage.getItem(`segundo_${this.id}`);
      const semLocalStorage = this.hora === '00' && this.minuto === '00';
      if(!!tempo && !!segundo && semLocalStorage) {
        this.iniciarContagem(tempo,segundo);
      }
    },500); // Esperar comando do LocalStorage
  }

  iniciarContagem(tempo: string, segundo?: string): void {
    const hora = tempo.split(":")[0]; // Recupero os dados recebidos
    const minuto = tempo.split(":")[1];
    this.segundo = segundo ? segundo : '00';
    this.seg = segundo ? +segundo : 0;

    this.renderizarTempo(hora,minuto,this.segundo); // Registro do tempo
    this.contador();
  }

  contador(): void {
    setTimeout(() => {
      const tela = this.telaService.buscar().find((tela: Tela) => tela.numero === +this.id);

      if(tela.icone == 'timer') {
        this.contar();
        this.contador();
      }
      else {
        localStorage.setItem(`tempo_status_${this.id}`,'00:00:00');
      }

    }, 1000);// Inicia a contagem
  }
}