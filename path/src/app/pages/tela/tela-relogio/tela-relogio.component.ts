import { Component, OnInit } from '@angular/core';

import { Cidade } from 'src/app/models/Cidade';
import { Clima } from 'src/app/models/Clima';

@Component({
  selector: 'app-tela-relogio',
  templateUrl: './tela-relogio.component.html',
  styleUrls: ['./tela-relogio.component.scss']
})
export class TelaRelogioComponent implements OnInit {
  id: string = '';
  telaUrl: string = '';

  nomeCidade = 'Sete Lagoas';
  chaveApi = 'af771379a3ebcb50459501b069cdebc8';
  clima: Clima = {src: '', cep: '', temperatura: '', descricao: ''};
  hora: string = '00';
  minuto: string = '00';

  ngOnInit(): void {
    this.buscarHorario();
    this.formatarInformacaoClima();
  }

  async buscarCidade() {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(this.nomeCidade)}&appid=${this.chaveApi}`;
    const resultado = await fetch(apiUrl);
    const resultadoUrl = resultado.url;

    const dados: any = await fetch(resultadoUrl)
    .then(resposta => resposta.json())
    .catch(() => false);

    return dados[0];      
  }

  async buscarClima() {
    const dadosCidade: Cidade = await this.buscarCidade();

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${dadosCidade.lat}&lon=${dadosCidade.lon}&appid=${this.chaveApi}&units=metric&lang=pt_br`;
    const resultado = await fetch(apiUrl);
    const resultadoUrl = resultado.url;

    const dados = await fetch(resultadoUrl)
    .then(resposta => resposta.json())
    .catch(() => false);

    const informacao = dados ? { dados: dados, dadosCidade: dadosCidade } : false;
    return informacao;   
  }

  async formatarInformacaoClima() {
      const informacao: any = await this.buscarClima();

      if(informacao) {
        this.clima = {
          src:`http://openweathermap.org/img/wn/${informacao.dados.weather[0].icon}@2x.png`,
          temperatura: `${informacao.dados.main.temp} C°`,
          descricao: String(informacao.dados.weather[0].description).toUpperCase(),
          cep: `${informacao.dadosCidade.name} ${informacao.dadosCidade.country}`,      
        };
      }

      setTimeout(() => {
        this.formatarInformacaoClima();
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
    }, 1000); // 1 minuto
  }
}
