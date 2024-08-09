import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IconeRotaService } from './icone-rota.service';
import { Tela } from '../models/Tela';

@Injectable({
  providedIn: 'root'
})
export class TelaService {
  listaTelas: Tela[] = [];
  configuracaoOpenTela: string = `toolbar=yes,location=yes,directories=no, status=no, menubar=yes,scrollbars=yes, resizable=no,copyhistory=yes, width=500px,height=200px`;
  
  constructor(readonly iconeRotaService: IconeRotaService) { }

  buscar(): Tela[] {
    const sessionNumeros = sessionStorage.getItem("numeros");
    const sessionRotas = sessionStorage.getItem("icones");

    if(sessionNumeros && sessionRotas) {
      this.listaTelas = [];
      const numeros = sessionNumeros.split(",");
      const rotas = sessionRotas.split(",");

      for(let posicao in numeros) {
        this.listaTelas.push({
          numero: +numeros[posicao],
          icone: rotas[posicao]
        });
      }

    }
    return this.listaTelas;
  }

  ordenarLista(lista: Tela[]): Tela[] {
    return lista.sort((a:Tela,b:Tela) => a.numero > b.numero ? 1 : -1);
  }

  excluirTelaLista(numero: number): Tela[] {
    this.listaTelas = this.ordenarLista(this.listaTelas)
    let novaLista: Tela[] = this.listaTelas.filter(el => {
      if(el.numero !== numero) {
        if(el.numero < numero) {
          return el;
        }
        localStorage.setItem("tela", `${el.numero},decrementoId`);// Envia comando para decrementar id da tela
        el.numero--;
        return el;
      }// Remove tela da lista
      return
    });
    return novaLista;
  }

  fechar(numero: number): Tela[] {
    localStorage.setItem("tela", `${numero},fechar`);// Envia a mensagem para tela se fechar
    this.listaTelas = this.excluirTelaLista(numero);
    this.registrarSessionStorage();
    return this.listaTelas;
  }

  gerar(): Tela[] | undefined {
    const limiteTela = this.listaTelas.length < 3;
    if(limiteTela) {
      const numero = this.listaTelas.length + 1;
      window.open(`../tela/${numero}`,"_blank",this.configuracaoOpenTela);
      const novaTela: Tela = {
        numero: numero,
        icone: 'villa',
      }
      this.listaTelas.push(novaTela);
      this.registrarSessionStorage();
      return this.listaTelas;
    }
    return undefined;
  }

  gerarTelaEspecifica(rota: string) {
    window.open(`../tela/${rota}/local`,"_blank",this.configuracaoOpenTela);
  }

  navegar(rota: string, numeros: number[]): void {
    numeros.map((numero: number) => {
      this.listaTelas.map((tela: Tela) => {
        if(tela.numero == numero) {
          tela.icone = this.iconeRotaService.iconeRota(rota);
        }
      })
      const rotaUrl = rota === 'tela' ? `tela/${numero}` : `tela/${rota}/${numero}`;
      localStorage.setItem("tela", `${numero},${rotaUrl}`);
    })
    this.registrarSessionStorage();
  }

  recarregar(numeros: number[] | 'local') {
    if(numeros == 'local') {
      localStorage.setItem("tela", `local,recarregar`);
    }
    else {
      numeros.forEach((numero: number) => {
        localStorage.setItem("tela", `${numero},recarregar`);
      });
    }
  }

  registrarSessionStorage(): void {
    if(this.listaTelas.length > 0) {
      const numeros = this.listaTelas.map(el => el.numero);
      const icones = this.listaTelas.map(el => el.icone);

      const numerosStr = numeros.join(",");
      const iconesStr = icones.join(",");

      sessionStorage.setItem("numeros", numerosStr); 
      sessionStorage.setItem("icones", iconesStr); 
      return;
    }
    sessionStorage.removeItem("numeros");
    sessionStorage.removeItem("icones");
  }

  eventosLocalStorage(resultado: any, id: string, telaUrl: string, router: Router): void {
    if(resultado[0] == id) {
      switch(resultado[1]) {
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
        default:
          const rotaUrl = resultado[1];
          router.navigate([`${rotaUrl}`]);
      }
      localStorage.removeItem("tela");
    }
  }// Valida o localStorage
}
