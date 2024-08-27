import { Component } from '@angular/core';

@Component({
  selector: 'app-tela-sorteio',
  templateUrl: './tela-sorteio.component.html',
  styleUrls: ['./tela-sorteio.component.scss']
})
export class TelaSorteioComponent {
  numero: string = '00';
  receberValor(sorteio: string) {
    if(sorteio != undefined) {
      this.numero = sorteio;
      this.numero = +this.numero < 10 ? `0${this.numero}` : this.numero;
    }
  }
}
