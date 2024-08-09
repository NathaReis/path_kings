import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CasaComponent } from './pages/casa/casa.component';
import { RelogioComponent } from './pages/casa/relogio/relogio.component';
import { TelaComponent } from './pages/tela/tela.component';
import { TelaRelogioComponent } from './pages/tela/tela-relogio/tela-relogio.component';
import { TelaTempoComponent } from './pages/tela/tela-tempo/tela-tempo.component';
import { SorteioComponent } from './pages/casa/sorteio/sorteio.component';

const routes: Routes = [
  {path: '', redirectTo: 'casa', pathMatch: 'full'},
  {path: 'casa', component: CasaComponent},
  {path: 'casa/relogio', component: RelogioComponent},
  {path: 'casa/sorteio', component: SorteioComponent},
  {path: 'tela/:id', component: TelaComponent},
  {path: 'tela/relogio/:id', component: TelaRelogioComponent},
  {path: 'tela/tempo/:id', component: TelaTempoComponent},
  {path: '**', redirectTo: 'casa', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }