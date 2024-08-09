import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  configTema(tema: string): void {
    const html = document.querySelector("html");
    const temaAtual = this.buscarTemaAtual();
    if(temaAtual) {
      html?.classList.remove(temaAtual);
    }
    localStorage.setItem('tema', tema);
    html?.classList.add(tema);
  }

  buscarTemaAtual(): string {
    const tema = localStorage.getItem('tema');
    return tema || 'claro';
  }
}
