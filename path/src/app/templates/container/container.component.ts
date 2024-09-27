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
    const idSaved = sessionStorage.getItem("id");
    if(!idSaved) {
      this.formatarId();
    }
    else {
      this.id = idSaved;
    }

    window.onstorage = (event) => {
      const chave = event.key;
      const novoValor = event.newValue;

      if(this.monitor == 'true') {
        if(this.validoIdNovoValor(novoValor) && novoValor) {
          if(chave === 'tela') {
            this.telaService.eventosLocalStorage(novoValor.split(","), this.id, this.router);      
          }
          if(chave === 'tempo') { 
            const ultimoIndex = novoValor.split(",").length - 1;
            const horario = novoValor.split(",")[ultimoIndex];
            this.tempo.emit(horario);
          }
          if(chave === 'sorteio') {
            this.sorteio.emit(novoValor.split(",").pop());  
          }
          if(chave === 'media') {
            this.media.emit(novoValor.split(",").pop());
          }
          if(chave === 'atualizarIcones') {
            const valores = novoValor.split(",");
            const quantidadeIcones = Number(valores.pop()) + 1;
            const tamanhoTotal = valores.length;
            const quantidadeIds = tamanhoTotal - quantidadeIcones;
                       
            const icones = [];
            for(let pos in valores) {
              if(+pos > quantidadeIds) {
                icones.push(valores[pos]);
              }
            }

            sessionStorage.setItem("icones", JSON.stringify(icones));
          }
          localStorage.removeItem(String(chave));        
        }
      }
      else {
        // Retonrno do relógio
        const tempoRegex = new RegExp('tempo_status', 'i');

        if(tempoRegex.test(String(chave)) && chave) {
          this.relogioService.setRelogio(+chave.split('_')[2],String(novoValor));
        }
      }
    }
  }

  formatarId(): void {
    const test = localStorage.getItem("test");
    let atraso = 0;
    
    if(!test) {
      localStorage.removeItem("id");
      localStorage.removeItem("icones");
      localStorage.setItem("test", 'true');
    }
    
    
    const local = localStorage.getItem("id");
    const icones = localStorage.getItem("icones");

    if(local && icones) {
      const localList = JSON.parse(local);
      const newList = [...localList,String(++localList.length)];
      localStorage.setItem("id", JSON.stringify(newList));

      const iconesList = JSON.parse(icones);
      const newIcones = [...iconesList,'villa'];
      localStorage.setItem("icones", JSON.stringify(newIcones));

      this.id = localList.length
      atraso = 500 * localList.length;

      this.router.navigate(['tela'])
    }
    else {
      localStorage.setItem("id", JSON.stringify(['1']));
      localStorage.setItem("icones", JSON.stringify(['home']));
      this.id = '1';
      atraso = 0;
    }
    sessionStorage.setItem("id", this.id);

    setTimeout(() => {
      const local = localStorage.getItem("id");
      const icones = localStorage.getItem("icones");
      setTimeout(() => {
        if(local && icones) {
          sessionStorage.setItem("ids", local);
          sessionStorage.setItem("icones", icones);
          localStorage.removeItem("id");
          localStorage.removeItem("icones");
          localStorage.removeItem("test");
        }
      }, 2500 + atraso);
    }, 2500 + atraso);
  }
}
