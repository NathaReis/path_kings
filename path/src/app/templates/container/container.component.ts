import { Component, Input, OnInit } from '@angular/core';
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
        if(event.key === 'tema') {
          const html = document.querySelector("html");
          const tema: string = String(event.newValue);
          const temaAtual: string = String(event.oldValue);
  
          temaAtual ? html?.classList.remove(temaAtual) : null;
  
          html?.classList.add(tema);
        }
        if(event.key === 'tela') {
          const telaUrl = this.router.url.slice(0,-1);
          let id: string = '';
  
          this.route.params.subscribe((params: any) => {
            id = String(params["id"]);
          });// Busca id
  
          const resultado = event.newValue?.split(",");
          this.telaService.eventosLocalStorage(resultado, id, telaUrl, this.router);      
        }
      }
    }
  }
}
