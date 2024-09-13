import { Component, OnInit } from '@angular/core';

import { Media } from 'src/app/models/Media';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-tela-media',
  templateUrl: './tela-media.component.html',
  styleUrls: ['./tela-media.component.scss']
})
export class TelaMediaComponent implements OnInit{
  media: Media[] = [];

  constructor (private mediaService: MediaService) {}

  ngOnInit(): void {
    const id = sessionStorage.getItem("idMedia");
    if(id) {
      this.buscarMedia(id);
    }
  }

  buscarMedia(id: string) {
    this.mediaService.buscarMedia(id).subscribe({
      next: (value: Media) => {
        sessionStorage.setItem("idMedia",id);
        this.media = [value];
      },
      error: (error) => {
        sessionStorage.removeItem("idMedia");
        console.error(error);
      }
    });
  }
}
