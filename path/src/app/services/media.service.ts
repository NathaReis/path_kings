import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Media } from '../models/Media';

interface Tipo {
  categoria: string,
  dados: Media[]
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  baseURL: string = 'http://localhost:3000/media';
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
  listaCategorias: string[] = ['video','imagem','audio','powerpoint'];

  constructor(private http: HttpClient) { }

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

  criarMedia(tipo: string, nome: string, dados: string): Observable<Media> {
    const media: Media = {
      categoria: tipo,
      nome: nome,
      dados: dados
    };
    return this.http.post<Media>(this.baseURL, media);
  }

  buscarMedias(): Observable<Tipo[]> {
    return new Observable((observer) => {
      this.listaTipos.map((item: Tipo) => item.dados = []);
      this.http.get<Media[]>(this.baseURL).subscribe({
        next: (value: Media[]) => {
          this.listaTipos.map((tipo: Tipo) => {
            value.map((media: Media) => {
              console.log(tipo)
              console.log(media)
              console.log(this.listaCategorias.includes(media.categoria))
              if(this.listaCategorias.includes(media.categoria)) {
                if(tipo.categoria == media.categoria) {
                  tipo.dados.push(media);
                }
              }// Se categoria da mídia já existir na lista
              else {
                this.listaCategorias.push(media.categoria);
                this.listaTipos.push({categoria: media.categoria, dados: [media]});
              }// Se a categoria for nova
            });
          });
          console.log(this.listaTipos)
          console.log(this.listaCategorias)
          observer.next(this.listaTipos);
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }

  deletarMedia(id: string): Observable<Media> {
    return this.http.delete<Media>(`${this.baseURL}/${id}`);
  }
}
