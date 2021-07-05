import { Component, OnInit } from '@angular/core';
import {GameService} from "../game/game.service";
import {CreateGameDTO} from "../interfaces/dto/createGameDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html'
})
export class GameListComponent implements OnInit {
  games: CreateGameDTO[];   // games array

  constructor(private gameService: GameService, private router: Router) { }

  async ngOnInit() {
    // Get game list from BackEnd API
    this.games = (await this.gameService.getGames()).data;
  }

  backToMenu() {
    this.router.navigate(['']);
  }
}
