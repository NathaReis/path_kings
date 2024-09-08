import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

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
  listaTipos: Tipo[] = [
    {
      categoria: 'video',
      dados: []
    },
    {
      categoria: 'imagem',
      dados: []
    },
    {
      categoria: 'audio',
      dados: []
    },
    {
      categoria: 'powerpoint',
      dados: []
    },
  ];
  telaSelecionada: string[] = [];
  telas: Tela[] = [];

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
    this.converterBase64(arquivo).subscribe({
      next: (arquivoConvertido: string) => {
          const media: Media = {
            categoria: this.tipoAtual,
            nome: arquivo.name,
            dados: arquivoConvertido
          };
          console.log(media);
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

  selecioneArquivo(media: Media): void {
    console.log(media);
  }
}
