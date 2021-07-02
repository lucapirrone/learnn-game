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
  round: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.modalita = params.modalita ? params.modalita : null;
      this.round = params.round ? params.round : null;
    });
  }
  ngOnInit(): void {
  }

  setModalita(modalita: Modalita) {
    this.modalita = modalita;
    this.router.navigate([], {queryParams: {round: this.round, modalita}});
  }
  setRound(round: number) {
    this.round = round;
    this.router.navigate([], {queryParams: {modalita: this.modalita, round}});

    if (this.modalita && this.round) {
      this.router.navigate(['game'], {queryParams: {modalita: this.modalita, round: this.round}});
    }
  }

}
