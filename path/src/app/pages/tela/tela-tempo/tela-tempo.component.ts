import { Component, OnInit } from '@angular/core';

import { GeoService } from '../../../services/geo.service';
import { Clima } from '../../../models/Clima';
import { ActivatedRoute } from '@angular/router';

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
  segundo: number = 0;

  constructor(readonly geo: GeoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buscarClima();
  
    this.route.params.subscribe((params: any) => {
      this.id = String(params["id"]);
    });// Busca id
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

  registrarTempo(hora: string, minuto: string): void {
    sessionStorage.setItem(`tempo_${this.id}`,`${hora}:${minuto}`);
  }

  preencherTempo(hora: string, minuto: string): void {
    this.hora = hora;
    this.minuto = minuto;
  }

  renderizarTempo(hora: string, minuto: string): void {
    this.registrarTempo(this.formatarHora(hora),this.formatarHora(minuto));
    this.preencherTempo(this.formatarHora(hora),this.formatarHora(minuto));
    console.log(hora, ':', minuto, ':', this.segundo);
  }

  contar(): void {
    this.segundo--;
    if(this.segundo < 0) {
      if(+this.minuto > 0) {
        this.segundo = 59;
        const decremento: number = +this.minuto - 1;
        this.minuto = this.formatarHora(String(decremento));
      }
      else if(+this.hora > 0) {
        this.segundo = 59;
        this.minuto = '59';
        const decremento: number = +this.hora - 1;
        this.hora = this.formatarHora(String(decremento));
      }
    }
    this.renderizarTempo(this.hora,this.minuto);
  }

  iniciarContagem(tempo: string): void {
    let contagem; // Defino a contagem
    const hora = tempo.split(":")[0]; // Recupero os dados recebidos
    const minuto = tempo.split(":")[1];

    clearInterval(contagem); // Paro a contagem atual
    this.renderizarTempo(hora,minuto); // Registro do tempo

    contagem = setInterval(() => {
      this.contar();
    }, 1000); // Inicio a contagem
  }
}