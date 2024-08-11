import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private temaService: TemaService,
    private telaService: TelaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const temaSalvo = this.temaService.buscarTemaAtual();
    this.temaService.configTema(temaSalvo);

    window.onstorage = (event) => {
      if(this.monitor == 'true') {
        const chave = event.key;
        const novoValor = event.newValue;
        const velhoValor = event.oldValue;

        if(chave === 'tema') {
          const html = document.querySelector("html");
          const tema: string = String(novoValor);
          const temaAtual: string = String(velhoValor);
  
          temaAtual ? html?.classList.remove(temaAtual) : null;
  
          html?.classList.add(tema);
        }
        if(chave === 'tela') {
          const telaUrl = this.router.url.slice(0,-1);
          let id: string = '';
  
          this.route.params.subscribe((params: any) => {
            id = String(params["id"]);
          });// Busca id
  
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
      }
    }
  }
}
