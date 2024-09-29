import { Component } from '@angular/core';

import { Header } from 'src/app/models/Header';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'path-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  mobile: string = 'desativado';

  constructor(
    readonly headerService: HeaderService,
  ) {};

  get header(): Header[] {
    return this.headerService.buscarHeader;
  }

  toggleMenu(): void {
    this.mobile = this.mobile == 'desativado' ? 'ativado' : 'desativado';
  }
}
