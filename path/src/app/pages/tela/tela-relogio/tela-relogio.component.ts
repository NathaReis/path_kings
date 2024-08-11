import { Component, OnInit } from '@angular/core';

import { Clima } from '../../../models/Clima';
import { GeoService } from '../../../services/geo.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tela-relogio',
  templateUrl: './tela-relogio.component.html',
  styleUrls: ['./tela-relogio.component.scss']
})
export class TelaRelogioComponent implements OnInit {
  id: string = '';
  telaUrl: string = '';

  clima: Clima = {src: '', cep: '', temperatura: '', descricao: ''};
  hora: string = '00';
  minuto: string = '00';

  constructor (private geo: GeoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.buscarHorario();
    this.buscarClima();

    this.route.params.subscribe((params: any) => {
      this.id = String(params["id"]);
    });// Busca id
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

  buscarHorario() {
    setInterval(() => {
      const agora = new Date();
      this.hora = this.formatarHora(agora.getHours());
      this.minuto = this.formatarHora(agora.getMinutes());
      const segundo = this.formatarHora(agora.getSeconds());
      localStorage.setItem(`tempo_status_${this.id}`,`${this.hora}:${this.minuto}:${segundo}`);
    }, 1000); // 1 segundo
  }
}
