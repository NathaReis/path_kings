import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GeoService } from '../../../services/geo.service';
import { Clima } from '../../../models/Clima';

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
  segundo: number = 59;
  esperarParaContar: boolean = false;

  constructor(private route: ActivatedRoute,private geo: GeoService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = String(params["id"]);
    });// Busca id

    window.onstorage = (event) => {
      const resultado = event.newValue?.split(",");
      if(event.key == 'tempo') {
        this.buscarHorario(resultado);
      }
    };// Busca localStorage
    this.buscarSessionStorage();
    this.buscarClima();
  }

  async buscarClima() {
    this.clima = await this.geo.buscarClima();

    setTimeout(() => {
      this.buscarClima();
    }, 600000) // 10 minutos
  }
  formatarHora(hora: number) {
    return hora < 10 ? `0${hora}` : `${hora}`;
  }

  resetarTempo(): void {
    this.hora = '00';
    this.minuto = '00';
  }

  pausarContagemTemporariamente(tempo: number): void {
    tempo += 100;
    this.esperarParaContar = true;
    setTimeout(() => {
      this.esperarParaContar = false;
      this.contagemDeMinuto();
    }, tempo);
  }

  buscarHoraMinuto(resultado: any): void {
    const posHorario = +resultado.length - 1;
    const horario = resultado[posHorario].split(":");
    this.hora = this.formatarHora(+horario[0]);
    this.minuto = this.formatarHora(+horario[1]);
  }

  contagemDeMinuto(): void {
    if(!this.esperarParaContar) {
      const diminuirMinuto = +this.minuto > 0;
      const diminuirHora = +this.hora > 0;
      sessionStorage.setItem(`tempo${this.id}`, `${this.id},${this.hora}:${this.minuto}`);
      
      setTimeout(() => {
        if(diminuirMinuto || diminuirHora) {
          if(diminuirMinuto) {
            this.minuto = this.formatarHora(+this.minuto - 1);
          }
          else if(diminuirHora) {
            this.hora = this.formatarHora(+this.hora - 1);
            this.minuto = '59';
          }
          this.contagemDeMinuto();
        }
        else {
          this.hora = '00';
          this.minuto = '00';
          sessionStorage.removeItem(`tempo${this.id}`);
        }
      }, 60000);
    }
  }

  buscarHorario(resultado: any) {
    if(resultado.includes(this.id)) {
      this.buscarHoraMinuto(resultado);
      
      const storage = sessionStorage.getItem(`tempo${this.id}`);
      storage ? this.pausarContagemTemporariamente(60000) : this.contagemDeMinuto();
    }
  }

  buscarSessionStorage(): void {
    const storage = sessionStorage.getItem(`tempo${this.id}`);
    if(storage) {
      const arrayDados = storage.split(",");
      this.buscarHorario(arrayDados);
    }
  }
}