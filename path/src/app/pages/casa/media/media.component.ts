import { Component, OnInit } from '@angular/core';

import { Media } from 'src/app/models/Media';
import { Tela } from 'src/app/models/Tela';
import { TelaService } from 'src/app/services/tela.service';

interface Tipo {
  categoria: string,
  dados: Media[]
}

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  tipoAtual: string = 'video';
  ultimoArquivoSelecionado: Tipo = { categoria: '', dados: [] };
  listaTipos: Tipo[] = [];
  telaSelecionada: string[] = [];
  telas: Tela[] = [];
  audio: string = "";

  constructor(private telaService: TelaService) { }

  ngOnInit(): void {
    this.telas = this.telaService.buscar();
  }

  toggleTodasTelas(ativar: boolean): void {
    ativar ? this.telaSelecionada = ['todas'] : this.telaSelecionada = this.telaSelecionada.filter((tela: string) => tela !== 'todas');
  }

  navMidia(tipo: string): void {
    this.tipoAtual = tipo;
  }

  uploadFile(dados: any): void {
    const arquivo = dados.target.files[0];
  }

  deleteMedia(id: string): void {

  }

  navegar(): void {
    if(this.telaSelecionada.includes('todas')) {
      const telasId = this.telas.map((tela: Tela) => tela.numero)
      console.log(telasId)
      this.telaService.navegar('media',telasId);
    }
    else {
      const telasId = this.telaSelecionada.map((tela: string) => +tela)
      this.telaService.navegar('media',telasId);
    }
  }

  selecioneArquivo(media: Media): void {
    if(media.categoria != 'audio') {
      this.navegar();
      localStorage.setItem('media', `${this.telaSelecionada},${media.id}`);
    }
    else {
      this.audio = media.dados;
    }
  }
}
