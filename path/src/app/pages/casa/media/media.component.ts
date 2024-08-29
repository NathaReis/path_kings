import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';

import { Observable } from 'rxjs';

import { Media } from 'src/app/models/Media';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  listaAtual: string = 'video';

  videos: Media[] = [];
  imagens: Media[] = [];
  audios: Media[] = [];
  powerpoints: Media[] = [];

  ngOnInit(): void {
    const erros = this.buscarDadosSalvos(['video','imagem','audio','powerpoint']);
    if(erros.length > 0) {
      console.log(erros);
    }
  }

  buscarDadosSalvos(dados: string[]): string[] {
    let erros: string[] = [];
    dados.map((categoria: string) => {
      const valores = localStorage.getItem(categoria);
      if(valores) {
        const conversao: Media[] = JSON.parse(valores);
        switch(categoria) {
          case 'video':
            this.videos = conversao;
            break;
          case 'imagem':
            this.imagens = conversao;
            break;
          case 'audio':
            this.audios = conversao;
            break;
          case 'powerpoint':
            this.powerpoints = conversao;
            break;
          default:
            erros.push(`Categoria ${categoria} não possui campo para preencher.`);
        }
      }
      else {
        erros.push(`Categoria ${categoria} não existe!`);
      }
    });
    return erros;
  }

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


  uploadFile(dados: any, categoria: 'video' | 'imagem' | 'audio' | 'powerpoint'): void {
    const arquivo = dados.target.files[0];
    this.converterBase64(arquivo).subscribe({
      next: (arquivoConvertido: string) => {
        const registroSalvo = this.registroArquivoSalvo(categoria);
        let novoRegistro = '[]';

        if(registroSalvo) {
          const registro: Media[] = JSON.parse(registroSalvo);
          const media: Media = {
            nome: arquivo.name,
            dados: arquivoConvertido
          };
          registro.push(media);
          novoRegistro = JSON.stringify(registro);
        }
        else {
          const media: Media[] = [{
            nome: arquivo.name,
            dados: arquivoConvertido
          }];
          novoRegistro = JSON.stringify(media);
        }
        localStorage.setItem(categoria, novoRegistro);
      },
      error(err) {
        alert(err);
      },
    });
  }

  converterBase64(file: File): Observable<string> {
    return new Observable((observer) => {
      const fileReader = new FileReader();
      fileReader.onload = (data: any) => {
        const resultado = data.target.result;
        if(resultado) {
          observer.next(resultado);
        }
        else {
          observer.error('Arquivo não encontrado!');
        }
        observer.complete();
      }
      fileReader.readAsDataURL(file);
    })
  }

  registroArquivoSalvo(categoria: string): string | undefined {
    const local = localStorage.getItem(categoria);
    if(categoria && categoria.length > 0) {
      return String(local);
    }
    return;
  }
}
