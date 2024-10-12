import { Component, OnInit } from '@angular/core';

import { Tela } from 'src/app/models/Tela';
import { TelaService } from 'src/app/services/tela.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  media: string = "";

  constructor(private telaService: TelaService) { }

  ngOnInit(): void {

  }

  selectedMedia(): void {
    if(this.media) {
      console.log(this.media);
    }
  }
}
