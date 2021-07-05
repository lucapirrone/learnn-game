import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameModeEnum} from "../interfaces/weapons.enum";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  gameMode: GameModeEnum | null = null;
  round: number | null = null;  // Chosen round number
  fastGame: boolean = false;  // Chosen fastGame
  username: string;   // Chosen username for HumanVsComputer GameMode
  GameModeEnum = GameModeEnum;  // GameModeEnum reachable for html template

  constructor(private router: Router, private route: ActivatedRoute) {
    // Get user choice from query params
    this.route.queryParams.subscribe(params => {
      this.gameMode = params.gameMode ? params.gameMode : null;
      this.round = params.round ? params.round : null;
      this.username = params.username ? params.username : null;
      this.fastGame = params.fastGame === "true";
    });
  }
  ngOnInit(): void {
  }

  setGameMode(gameMode: GameModeEnum) {
    // Set gameMode
    this.gameMode = gameMode;
    this.router.navigate([], {queryParams: {round: this.round, fastGame: this.fastGame, gameMode: this.gameMode, username: this.username}});
  }
  setUsername(username: string) {
    // Set username
    if (username.length > 8) {
      alert("L'username non deve superare 8 caratteri");
      return;
    }
    this.username = username;
    this.router.navigate([], {queryParams: {round: this.round, fastGame: this.fastGame, gameMode: this.gameMode, username: this.username}});
  }
  setRound(round: number) {
    // Set round number
    this.round = round;

    if (this.gameMode && this.round) {
      this.router.navigate(['game'], {queryParams: {round: this.round, fastGame: this.fastGame, gameMode: this.gameMode, username: this.username}});
    }
  }

}
