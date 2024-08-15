import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RelogioService } from 'src/app/services/relogio.service';

import { TelaService } from 'src/app/services/tela.service';
import { TemaService } from 'src/app/services/tema.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private temaService: TemaService,
    private telaService: TelaService,
    private relogioService: RelogioService
  ) {}

  ngOnInit(): void {
    const temaSalvo = this.temaService.buscarTemaAtual();
    this.temaService.configTema(temaSalvo);

    window.onstorage = (event) => {
      const chave = event.key;
      const novoValor = event.newValue;
      const velhoValor = event.oldValue;
      const telaUrl = this.router.url.slice(0,-1);
      let id: string = '';
  
      this.route.params.subscribe((params: any) => {
        id = String(params["id"]);
      });// Busca id

      if(this.monitor == 'true') {
        if(chave === 'tema') {
          const html = document.querySelector("html");
          const tema: string = String(novoValor);
          const temaAtual: string = String(velhoValor);
  
          temaAtual ? html?.classList.remove(temaAtual) : null;
  
          html?.classList.add(tema);
        }
        if(chave === 'tela') {
          const valores = novoValor?.split(",");
          if(valores) {
            this.telaService.eventosLocalStorage(valores, id, telaUrl, this.router);      
          }
        }
        if(chave === 'tempo') {
          let id: string = '';
  
          this.route.params.subscribe((params: any) => {
            id = String(params["id"]);
          });// Busca id

          const valores = novoValor?.split(",");
          if(valores?.includes(id)) {
            const ultimoIndex = valores.length - 1;
            const horario = valores[ultimoIndex];

            this.tempo.emit(horario);
          }
        }
        if(chave === 'sorteio') {
          const splitValor = novoValor?.split(",");
          const ids = splitValor?.slice(0,splitValor.length - 1);
          if(ids?.includes(id) && splitValor) {  
            const numero = splitValor?.pop();  
            this.sorteio.emit(numero);
          }
        }
      }
      else {
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
}
