import { Component, OnInit } from '@angular/core';

import { Clima } from '../../../models/Clima';
import { GeoService } from '../../../services/geo.service';
import { TelaService } from 'src/app/services/tela.service';
import { Tela } from 'src/app/models/Tela';


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

  constructor (private geo: GeoService, private telaService: TelaService) {}

  ngOnInit(): void {
    this.buscarHorario();
    this.buscarClima();
    const idSaved = sessionStorage.getItem("id");
    if(idSaved) {
      this.id = idSaved;
    }
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
    setTimeout(() => {
      const tela = this.telaService.buscar().find((tela: Tela) => tela.numero === +this.id);

      if(tela.icone == 'access_time') {
        const agora = new Date();
        this.hora = this.formatarHora(agora.getHours());
        this.minuto = this.formatarHora(agora.getMinutes());
        const segundo = this.formatarHora(agora.getSeconds());
        localStorage.setItem(`tempo_status_${this.id}`,`${this.hora}:${this.minuto}:${segundo}`);
        this.buscarHorario();
      }
      else {
        localStorage.setItem(`tempo_status_${this.id}`,'00:00:00');
      }

    }, 1000); // 1 segundo
  }
}
