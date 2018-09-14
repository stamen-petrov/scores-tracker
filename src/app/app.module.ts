import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/components/player.component';
import { ConfirmModalComponent } from './player/components/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
