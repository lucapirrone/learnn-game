import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

export enum Modalita {
  UmanoVsComputer,
  ComputerVsComputer
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  ModalitaEnum = Modalita;
  modalita: Modalita | null = null;
  fastGame: boolean = false;
  username: string;
  round: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.modalita = params.modalita ? params.modalita : null;
      this.round = params.round ? params.round : null;
      this.username = params.username ? params.username : null;
      this.fastGame = params.fastGame === "true";
    });
  }
  ngOnInit(): void {
  }

  setModalita(modalita: Modalita) {
    this.modalita = modalita;
    this.router.navigate([], {queryParams: {round: this.round, fastGame: this.fastGame, modalita: this.modalita, username: this.username}});
  }
  setUsername(username: string) {
    if (username.length > 8) {
      alert("L'username non deve superare 8 caratteri");
      return;
    }
    this.username = username;
    this.router.navigate([], {queryParams: {round: this.round, fastGame: this.fastGame, modalita: this.modalita, username: this.username}});
  }
  setRound(round: number) {
    this.round = round;
    //this.router.navigate([], {queryParams: {modalita: this.modalita, round}});

    if (this.modalita && this.round) {
      this.router.navigate(['game'], {queryParams: {round: this.round, fastGame: this.fastGame, modalita: this.modalita, username: this.username}});
    }
  }

}
