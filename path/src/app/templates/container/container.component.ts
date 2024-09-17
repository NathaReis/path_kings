import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RelogioService } from 'src/app/services/relogio.service';
import { TelaService } from 'src/app/services/tela.service';

@Component({
  selector: 'path-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input() background: string = 'padrao';
  @Input() monitor: string = 'false';
  @Output() tempo = new EventEmitter<string>();
  @Output() sorteio = new EventEmitter<string>();
  @Output() media = new EventEmitter<string>();

  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private telaService: TelaService,
    private relogioService: RelogioService
  ) {}

  validoIdNovoValor(novoValor: string|null): boolean {
    if(novoValor) {
      const ids = novoValor.split(",").slice(0,novoValor.split(",").length - 1); 
      return ids.includes(this.id);
    }
    return false;
  }

  ngOnInit(): void {

    this.formatarId();

    window.onstorage = (event) => {
      const chave = event.key;
      const novoValor = event.newValue;
      const telaUrl = this.router.url.slice(0,-1);

      if(this.monitor == 'true') {
        if(this.validoIdNovoValor(novoValor) && novoValor) {
          if(chave === 'tela') {
            this.telaService.eventosLocalStorage(novoValor.split(","), this.id, telaUrl, this.router);      
          }
          if(chave === 'tempo') {  
            const ultimoIndex = novoValor.split(",").length - 1;
            const horario = novoValor.split(",")[ultimoIndex];
            this.tempo.emit(horario);
          }
          if(chave === 'sorteio') {
            this.sorteio.emit(novoValor.split(",").pop());  
            localStorage.removeItem('sorteio');
          }
          if(chave === 'media') {
            this.media.emit(novoValor.split(",").pop());
            localStorage.removeItem('media');
          }
        }
      }
      else {
        // Retonrno do relógio
        if(chave === 'tempo_status_1') {
          this.relogioService.setRelogio(1,String(novoValor));
        }
        if(chave === 'tempo_status_2') {
          this.relogioService.setRelogio(2,String(novoValor));
        }
        if(chave === 'tempo_status_3') {
          this.relogioService.setRelogio(3,String(novoValor));
        }
      }
    }
  }

  formatarId(): void {
    const local = localStorage.getItem("id");

    if(local) {
      if(local.split(',').length === 1) {
        localStorage.setItem("id", '1,2');
        this.id = '2';
      }
      else if(local.split(',').length === 2) {
        localStorage.setItem("id", '1,2,3');
        this.id = '3';
      }
    }
    else {
      localStorage.setItem("id", '1');
      this.id = '1';
    }
  }
}
