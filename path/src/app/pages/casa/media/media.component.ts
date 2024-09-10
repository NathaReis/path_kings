import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Media } from 'src/app/models/Media';
import { Tela } from 'src/app/models/Tela';
import { MediaService } from 'src/app/services/media.service';
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

  constructor(
    private telaService: TelaService,
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {
    this.telas = this.telaService.buscar();
    this.buscarMedia();
  }

  toggleTodasTelas(ativar: boolean): void {
    ativar ? this.telaSelecionada = ['todas'] : this.telaSelecionada = this.telaSelecionada.filter((tela: string) => tela !== 'todas');
  }

  navMidia(tipo: string): void {
    this.tipoAtual = tipo;
  }

  buscarMedia(): void {
    this.mediaService.buscarMedias().subscribe({
      next: (value) => {
        console.log(value);
        this.listaTipos = value;
      },
      error: (error) => console.error(error)
    });
  }

  uploadFile(dados: any): void {
    const arquivo = dados.target.files[0];
    this.mediaService.converterBase64(arquivo).subscribe({
      next: (arquivoConvertido: string) => {
        this.mediaService.criarMedia(this.tipoAtual,arquivo.name,arquivoConvertido).subscribe({
          next: (value) => this.buscarMedia(),
          error: (error) => console.error(error)
        });
      },
      error(err) {
        alert(err);
      },
    });
  }

  deleteMedia(id: string): void {
    this.mediaService.deletarMedia(id).subscribe({
      next: (value) => {
        alert(`Media ${value.nome}, excluída com sucesso!`);
        this.buscarMedia();
      }
    });
  }

  selecioneArquivo(media: Media): void {
    console.log(media);
  }
}
