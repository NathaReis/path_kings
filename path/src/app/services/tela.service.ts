import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IconeRotaService } from './icone-rota.service';
import { Tela } from '../models/Tela';

@Injectable({
  providedIn: 'root'
})
export class TelaService {
  listaTelas: Tela[] = [];
  configuracaoOpenTela: string = `toolbar=yes,location=yes,directories=no, status=no, menubar=yes,scrollbars=yes, resizable=no,copyhistory=yes, width=500px,height=500px`;
  
  constructor(readonly iconeRotaService: IconeRotaService) { }
  
  private ordenarLista(lista: Tela[]): Tela[] {
    return lista.sort((a:Tela,b:Tela) => a.numero > b.numero ? 1 : -1);
  }

  private excluirTelaLista(numero: number): Tela[] {
    this.listaTelas = this.ordenarLista(this.listaTelas); // A exclusão só é bem sucedida com telas ordenadas.
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

  private registrarSessionStorage(): void {
    if(this.listaTelas.length > 0) {
      const numeros = this.listaTelas.map(el => el.numero);// Busca os números das telas
      const icones = this.listaTelas.map(el => el.icone);// Busca as rotas/icones das telas

      const numerosStr = numeros.join(",");// Transforma eles em uma array
      const iconesStr = icones.join(",");

      sessionStorage.setItem("numeros", numerosStr); // Registra na sessão
      sessionStorage.setItem("icones", iconesStr); 
      return;
    }
    sessionStorage.removeItem("numeros");// Se não existir lista, exclui a sessão
    sessionStorage.removeItem("icones");
  }

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

  fechar(numero: number): Tela[] {
    localStorage.setItem("tela", `${numero},fechar`);// Envia comando para fechar a tela
    this.listaTelas = this.excluirTelaLista(numero);// Exclui tela da lista local
    this.registrarSessionStorage();// Registra a nova lista sem a tela na sessão 
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
    return;
  }

  navegar(rota: string, numeros: number[]): void {
    numeros.map((numero: number) => {
      this.listaTelas.map((tela: Tela) => {
        if(tela.numero == numero) {
          tela.icone = this.iconeRotaService.iconeRota(rota);
        }
      })
      const rotaUrl = rota === 'tela' ? `tela/${numero}` : `tela/${rota}/${numero}`;// Caso esteja voltando para a tela inicial tela/numero caso contrário é preciso a rota dentro de tela
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
