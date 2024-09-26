import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IconeRotaService } from './icone-rota.service';
import { Tela } from '../models/Tela';

@Injectable({
  providedIn: 'root'
})
export class TelaService {
  listaTelas: Tela[] = [];
  
  constructor(readonly iconeRotaService: IconeRotaService) { }

  private registrarSessionStorage(): void {
    const numeros = this.listaTelas.map(el => String(el.numero));// Busca os números das telas
    const icones = this.listaTelas.map(el => el.icone);// Busca as rotas/icones das telas
    sessionStorage.setItem("ids", JSON.stringify(numeros)); // Registra na sessão
    sessionStorage.setItem("icones", JSON.stringify(icones)); 
  }

  buscar(): any {
    const sessionNumeros = sessionStorage.getItem("ids");
    const sessionRotas = sessionStorage.getItem("icones");

    if(sessionNumeros && sessionRotas) {
      this.listaTelas = [];
      const numeros = JSON.parse(sessionNumeros);
      const rotas = JSON.parse(sessionRotas);

      for(let posicao in numeros) {
        this.listaTelas.push({
          numero: +numeros[posicao],
          icone: rotas[posicao]
        });
      }

    }
    return this.listaTelas;
  }

  navegar(rota: string, numeros: number[]): void {
    numeros.map((numero: number) => {
      this.listaTelas.map((tela: Tela) => {
        if(tela.numero == numero) {
          tela.icone = this.iconeRotaService.iconeRota(rota);
        }
      })
      const rotaUrl = rota === 'tela' ? `tela` : `tela/${rota}`;// Caso esteja voltando para a tela inicial tela/numero caso contrário é preciso a rota dentro de tela
      localStorage.setItem("tela", `${numero},${rotaUrl}`);// Envia comando de navegação
    })
    this.registrarSessionStorage();// Registra a nova rota na sessão
  }

  recarregar(numeros: number[]) {
    numeros.map((numero: number) => {
      localStorage.setItem("tela", `${numero},recarregar`);// Envia comando para recarregar tela
    });
  }

  eventosLocalStorage(resultado: any, id: string, telaUrl: string, router: Router): void {
    const idResultado = resultado[0];
    const comando = resultado[1];
    
    if(idResultado == id) {
      switch(comando) {
        case 'fechar':
          window.close();
          break
        case 'decrementoId':
          const novoId = +id - 1;
          router.navigate([`${telaUrl}${novoId}`]);
          break
        case 'recarregar':
          location.reload();
          break
        default: // Caso seja para navegar, o comando é a rota
          const rotaUrl = comando;
          router.navigate([`${rotaUrl}`]);
      }
      localStorage.removeItem("tela"); // Remove tela após a ação
    }
  }// Valida o localStorage
}
