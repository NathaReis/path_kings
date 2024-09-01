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
    this.buscarMedias();
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

          this.withDB((db: any) => {
            let request = db.add(media);
            request.onsuccess = () => {
              alert("Salvo com sucesso!");
              this.buscarMedias();
            };
            request.onerror = () => {
              alert("Erro ao tentar salvar!");
            };
          })
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

  deleteArquivo(id: any): void {
    if(confirm(`Deseja excluir arquivo?`)) {
      this.withDB((db: any) => {
        const request = db.delete(parseInt(id));
        request.onsuccess = () => {
          this.buscarMedias();
        };
        request.onerror = () => {
          alert("Erro ao tentar deletar!");
        };
      })
    }
  }

  buscarMedias(): void {
    this.listaTipos.map((tipo: Tipo) => tipo.dados = []);
    this.withDB((db: any) => {
      db.openCursor().onsuccess = (evento: any) => {
        let cursor = evento.target.result;
        if(cursor) {
          this.listaTipos.map((item: Tipo) => {
            if(item.categoria === cursor.value.categoria) {
              item.dados.push({
                id: cursor.key,
                categoria: cursor.value.categoria,
                nome: cursor.value.nome,
                dados: cursor.value.dados
              })
            }
          });
          cursor.continue();
        }
      }
    })
  }

  withDB(callback: any): void {
    let request = indexedDB.open("mediaGroup", 1);
    request.onerror = () => this.withDB(callback);
    request.onsuccess = () => {
      let db = request.result;
      callback(getStore(db));
    }
    request.onupgradeneeded = () => {
      let db = request.result;
      db.createObjectStore("medias", {autoIncrement: true});
      callback(getStore(db));
    }

    function getStore(db: any) {
      return db.transaction(["medias"], "readwrite").objectStore("medias");
    }
  }
}
