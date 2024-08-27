import { Component } from '@angular/core';

import { Media } from 'src/app/models/Media';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {
  listaAtual: string = 'video';

  videos: Media[] = [{nome: 'Vídeo Teste', dados: ''}];
  imagens: Media[] = [{nome: 'Imagem Teste', dados: ''}];
  audios: Media[] = [{nome: 'Audio Teste', dados: ''}];
  powerpoints: Media[] = [{nome: 'PowerPoint Teste', dados: ''}];

  navMidia(tipo: string): void {
    this.listaAtual = tipo;
  }
}
