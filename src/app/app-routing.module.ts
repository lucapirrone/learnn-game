import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {GameComponent} from "./game/game.component";
import {GameListComponent} from "./game-list/game-list.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'game-list',
    component: GameListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
