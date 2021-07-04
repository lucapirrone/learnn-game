import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {GameComponent} from './game/game.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LogoComponent} from './components/logo/logo.component';
import {ButtonComponent} from './components/button/button.component';
import {FormsModule} from "@angular/forms";
import {GameService} from "./game/game.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    LogoComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
