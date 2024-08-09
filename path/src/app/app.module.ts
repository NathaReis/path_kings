import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CasaComponent } from './pages/casa/casa.component';
import { TelaRelogioComponent } from './pages/tela/tela-relogio/tela-relogio.component';
import { RelogioComponent } from './pages/casa/relogio/relogio.component';
import { TelaComponent } from './pages/tela/tela.component';
import { HeaderComponent } from './templates/header/header.component';
import { ContainerComponent } from './templates/container/container.component';
import { TelaTempoComponent } from './pages/tela/tela-tempo/tela-tempo.component';
import { SorteioComponent } from './pages/casa/sorteio/sorteio.component';

@NgModule({
  declarations: [
    AppComponent,
    CasaComponent,
    RelogioComponent,
    TelaComponent,
    TelaRelogioComponent,
    HeaderComponent,
    ContainerComponent,
    TelaTempoComponent,
    SorteioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
