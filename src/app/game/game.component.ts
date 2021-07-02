import {Component, OnInit} from '@angular/core';
import {Modalita} from "../home/home.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Scelta, scelte} from "../interfaces/scelte.enum";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

  modalita: Modalita = Modalita.UmanoVsComputer;
  ModalitaEnum = Modalita;
  scelte = scelte;
  round: number = 5;
  fastGame: boolean = false;
  loading = false;

  gameOver: boolean = false;

  usernameSx: string = "CPU 1";
  sceltaSx: Scelta = scelte[0];
  punteggioSx: number = 0;
  usernameDx: string = "CPU 2";
  sceltaDx: Scelta = scelte[0];
  punteggioDx: number = 0;

  title: string = "";

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.modalita = params.modalita ? params.modalita : null;
      this.round = params.round ? params.round : null;
      this.fastGame = params.fastGame === "true";
    });

    if (this.modalita === null || this.round === null) {
      this.router.navigate(['']);
    }

    if (this.modalita == Modalita.ComputerVsComputer) {
      this.title = "Gioca per iniziare";
    }
    if (this.modalita == Modalita.UmanoVsComputer) {
      this.title = "Fai la tua scelta";
      this.usernameSx = "Umano"
      this.usernameDx = "CPU"
    }
  }

  ngOnInit(): void {
  }

  async handlePlay(scelta?: Scelta) {
    if (this.loading)
      return;

    this.loading = true;

    if (scelta) {
      this.sceltaSx = scelta;
      this.title = "In attesa della scelta dell'avversario..."
      if (this.fastGame) {
        this.sceltaDx = this.generaSceltaRandom();
      } else {
        await new Promise(async (resolve, reject) => {
          let stop = false;

          setTimeout(() => {
            stop = true;
            setTimeout(() => {
              resolve(true);
            }, 500)
          }, 2000)

          while (!stop) {
            await new Promise((resolve, reject) => {
              setTimeout(() => {
                this.sceltaDx = this.generaSceltaRandom();
                resolve(true);
              }, 100)
            });
          }
        })
      }
    } else {
      this.title = "Scelta in corso..."

      if (this.fastGame) {
        this.sceltaSx = this.generaSceltaRandom();
        this.sceltaDx = this.generaSceltaRandom();
      } else {
        await Promise.all([
          new Promise(async (resolve, reject) => {
            let stop = false;

            setTimeout(() => {
              stop = true;
              setTimeout(() => {
                resolve(true);
              }, 200)
            }, 2000)

            while (!stop) {
              await new Promise((resolve, reject) => {
                setTimeout(() => {
                  this.sceltaSx = this.generaSceltaRandom();
                  resolve(true);
                }, 100)
              });
            }
          }),
          new Promise(async (resolve, reject) => {
            let stop = false;

            setTimeout(() => {
              stop = true;
              setTimeout(() => {
                resolve(true);
              }, 500)
            }, 2000)

            while (!stop) {
              await new Promise((resolve, reject) => {
                setTimeout(() => {
                  this.sceltaDx = this.generaSceltaRandom();
                  resolve(true);
                }, 100)
              });
            }
          })
        ])
      }

    }
    let vincitore = this.controlloVincitore(this.sceltaSx, this.sceltaDx);
    if (vincitore === 0) {
      this.title = "Pareggio!"
    }
    if (vincitore === 1) {
      this.title = "Vince "+this.usernameSx+"!"
      this.punteggioSx++;
    }
    if (vincitore === 2) {
      this.title = "Vince "+this.usernameDx+"!"
      this.punteggioDx++;
    }


    if (this.punteggioSx == this.round || this.punteggioDx == this.round) {
      let title = "Game Over!";
      if (this.punteggioSx === this.punteggioDx) title = title + "\nPareggio!"
      if (this.punteggioSx > this.punteggioDx) title = title + "\nVince "+this.usernameSx+"!"
      else title = title + "\nVince "+this.usernameDx+"!"
      this.title = title;
      this.gameOver = true;
    }

    this.loading = false;

  }

  generaSceltaRandom(): Scelta {
    return scelte[Math.floor(Math.random() * scelte.length)];
  }

  /*
    Questa funzione prende in input la scelta della mano sx e la scelta della mano dx.
    Restituisce:
    0 se pareggio;
    1 se vince sx;
    3 se vince dx
   */
  controlloVincitore(sceltaSx: Scelta, sceltaDx: Scelta): number {
    console.log('CONTROLLO VINCITA');
    console.log(sceltaSx.soggetto, sceltaDx.soggetto);
    if (sceltaSx.soggetto === sceltaDx.soggetto) return 0;

    for (let i = 0; i < scelte.length; i++) {
      if (scelte[i].soggetto === sceltaSx.soggetto && scelte[i].batte.includes(sceltaDx.soggetto))
        return 1;
    }
    return 2;
  }

  resetGioco() {
    this.punteggioSx = 0;
    this.punteggioDx = 0;
    this.gameOver = false;
    if (this.modalita == Modalita.ComputerVsComputer) this.title = "Gioca per iniziare";
    if (this.modalita == Modalita.UmanoVsComputer) this.title = "Fai la tua scelta";
  }

  tornaAlMenu() {
    this.router.navigate(['']);
  }
}
