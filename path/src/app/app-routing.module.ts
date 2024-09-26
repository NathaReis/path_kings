import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CasaComponent } from './pages/casa/casa.component';
import { RelogioComponent } from './pages/casa/relogio/relogio.component';
import { TelaComponent } from './pages/tela/tela.component';
import { TelaRelogioComponent } from './pages/tela/tela-relogio/tela-relogio.component';
import { TelaTempoComponent } from './pages/tela/tela-tempo/tela-tempo.component';
import { SorteioComponent } from './pages/casa/sorteio/sorteio.component';
import { TelaSorteioComponent } from './pages/tela/tela-sorteio/tela-sorteio.component';
import { MediaComponent } from './pages/casa/media/media.component';
import { TelaMediaComponent } from './pages/tela/tela-media/tela-media.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: CasaComponent},
  {path: 'casa/relogio', component: RelogioComponent},
  {path: 'casa/sorteio', component: SorteioComponent},
  {path: 'casa/media', component: MediaComponent},

  {path: 'tela', component: TelaComponent},
  {path: 'tela/relogio', component: TelaRelogioComponent},
  {path: 'tela/tempo', component: TelaTempoComponent},
  {path: 'tela/sorteio', component: TelaSorteioComponent},
  {path: 'tela/media', component: TelaMediaComponent},
  {path: '**', redirectTo: 'casa', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }