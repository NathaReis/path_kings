import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';

import { Observable } from 'rxjs';

import { Media } from 'src/app/models/Media';

interface Tipo {
  nome: string,
  dados: Media[]
}

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  tipoAtual: string = 'video';
  ultimoArquivoSelecionado: Tipo = { nome: '', dados: [] };
  listaTipos: Tipo[] = [
    {
      nome: 'video',
      dados: []
    },
    {
      nome: 'imagem',
      dados: []
    },
    {
      nome: 'audio',
      dados: []
    },
    {
      nome: 'powerpoint',
      dados: []
    },
  ];

  ngOnInit(): void {
    this.buscarDadosSalvos();
  }

  buscarDadosSalvos(): void {
    this.listaTipos.map((tipo: Tipo) => {
      tipo.dados = JSON.parse(String(localStorage.getItem(tipo.nome)));
    })
  }

  navMidia(tipo: string): void {
    this.tipoAtual = tipo;
  }

  uploadFile(dados: any): void {
    const arquivo = dados.target.files[0];
    this.converterBase64(arquivo).subscribe({
      next: (arquivoConvertido: string) => {
        const registroSalvo = localStorage.getItem(this.tipoAtual);
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
        localStorage.setItem(this.tipoAtual, novoRegistro);
        this.buscarDadosSalvos()
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

  deleteArquivo(tipo: Tipo): void {
    console.log(tipo);
    if(confirm(`Deseja excluir arquivo?`)) {

    }
  }
}
