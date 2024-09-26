import { Component, OnInit } from '@angular/core';

import { Media } from 'src/app/models/Media';

@Component({
  selector: 'app-tela-media',
  templateUrl: './tela-media.component.html',
  styleUrls: ['./tela-media.component.scss']
})
export class TelaMediaComponent implements OnInit{
  media: Media[] = [];


  ngOnInit(): void {
    const id = sessionStorage.getItem("idMedia");
    if(id) {
      this.buscarMedia(id);
    }
  }

  buscarMedia(id: string) {

  }
}
