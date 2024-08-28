import { Component } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';

import { Media } from 'src/app/models/Media';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {
  listaAtual: string = 'video';

  videos: Media[] = [{nome: 'Vídeo Teste', dados: ''},{nome: 'Vídeo Teste', dados: ''},{nome: 'Vídeo Teste', dados: ''}];
  imagens: Media[] = [{nome: 'Imagem Teste', dados: ''}];
  audios: Media[] = [{nome: 'Audio Teste', dados: ''}];
  powerpoints: Media[] = [{nome: 'PowerPoint Teste', dados: ''}];

  navMidia(tipo: string): void {
    this.listaAtual = tipo;
  }

  onSelectionChange(event: MatSelectionListChange) {
    if (event.source.selectedOptions.selected.length > 0) {
      const selectedVideo = event.source.selectedOptions.selected[0];
      console.log('Vídeo selecionado:', selectedVideo);

      // Faça algo com o vídeo selecionado, como:
      // - Chamar um serviço para buscar mais informações
      // - Atualizar outra parte da interface
    }
  }
}
