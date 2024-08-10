import { Injectable } from '@angular/core';

import { Clima } from './../models/Clima';
import { Cidade } from './../models/Cidade';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  nomeCidade = 'Sete Lagoas';
  chaveApi = 'af771379a3ebcb50459501b069cdebc8';
  clima: Clima = {src: '', cep: '', temperatura: '', descricao: ''};

  async buscarCidade() {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(this.nomeCidade)}&appid=${this.chaveApi}`;
    const resultado = await fetch(apiUrl);
    const resultadoUrl = resultado.url;

    const dados: any = await fetch(resultadoUrl)
    .then(resposta => resposta.json())
    .catch(() => false);

    return dados[0];      
  }

  private async infoClima() {
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

  async buscarClima() {
    const informacao: any = await this.infoClima();

    if(informacao) {
      const clima: Clima = {
        src:`http://openweathermap.org/img/wn/${informacao.dados.weather[0].icon}@2x.png`,
        temperatura: `${informacao.dados.main.temp} C°`,
        descricao: String(informacao.dados.weather[0].description).toUpperCase(),
        cep: `${informacao.dadosCidade.name} ${informacao.dadosCidade.country}`,      
      };
      return clima;
    }
    return this.clima
  }
}
