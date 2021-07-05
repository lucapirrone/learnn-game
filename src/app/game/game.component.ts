import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "./game.service";
import {ArrayWeapons, IWeapon, GameModeEnum} from "../interfaces/weapons.enum";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

  gameMode: GameModeEnum = GameModeEnum.HumanVsComputer;  // Chosen GameMode (HumanVsComputer default)
  round: number = 5;  // Chosen round number (5 default)
  fastGame: boolean = false;  // Chosen fastGame (false default)
  GameModeEnum = GameModeEnum;  // GameModeEnum reachable for html template
  ArrayWeapons = ArrayWeapons;  // ArrayWeapons reachable for html template
  loading = false;  // Loading state

  gameOver: boolean = false;  // Game Over state

  usernameSx: string = "CPU 1"; // Username Player Left
  weaponSx: IWeapon = ArrayWeapons[0];  // Chosen Weapon Player Left
  scoreSx: number = 0;  // Score Player Left
  usernameDx: string = "CPU 2"; // Username Player Right
  weaponDx: IWeapon = ArrayWeapons[0];  // Chosen Weapon Player Right
  scoreDx: number = 0;  // Score Player Right

  title: string = ""; // Temp title to show in template

  constructor(private router: Router, private route: ActivatedRoute, private gameService: GameService) {
    let username;
    // Get user choice from query params
    this.route.queryParams.subscribe(params => {
      this.gameMode = params.gameMode ? params.gameMode : null;
      this.round = params.round ? params.round : null;
      username = params.username ? params.username : null;
      this.fastGame = params.fastGame === "true";
    });

    // Go back to menu if there are no params
    if (this.gameMode === null || this.round === null) {
      this.router.navigate(['']);
    }

    // Set title to start game and set players name
    if (this.gameMode == GameModeEnum.ComputerVsComputer) {
      this.title = "Gioca per iniziare";
    }
    if (this.gameMode == GameModeEnum.HumanVsComputer) {
      this.title = "Fai la tua scelta";
      this.usernameSx = username ? username : "Umano"
      this.usernameDx = "CPU"
    }
  }

  ngOnInit(): void {
  }

  /*
    This function manages the click on the "Gioca" button and starts a new round.
    It accepts only one optional parameter or the weapon chosen by the "human" player if the game mode is "HumanVsComputer"
   */
  async handlePlay(weapon?: IWeapon) {
    if (this.loading)
      return;

    // Start loading state
    this.loading = true;

    // If the human weapon chosen by user is defined
    if (weapon) {
      this.weaponSx = weapon;
      this.title = "In attesa della scelta dell'avversario..."
      if (this.fastGame) {
        // Generate random CPU weapon
        this.weaponDx = this.generateRandonWeapon();
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
                this.weaponSx = this.generateRandonWeapon();
                resolve(true);
              }, 100)
            });
          }
        })
      }
    } else {
      this.title = "Scelta in corso..."

      if (this.fastGame) {
        // Generate random CPUs weapon
        this.weaponSx = this.generateRandonWeapon();
        this.weaponDx = this.generateRandonWeapon();
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
                  this.weaponSx = this.generateRandonWeapon();
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
                  this.weaponDx = this.generateRandonWeapon();
                  resolve(true);
                }, 100)
              });
            }
          })
        ])
      }

    }

    /*
     Get Round Winner
     0 Draw
     1 Player Left
     2 Player Right
     */
    let winner = this.checkWinner(this.weaponSx, this.weaponDx);
    if (winner === 0) {
      this.title = "Pareggio!"
    }
    if (winner === 1) {
      this.title = "Vince "+this.usernameSx+"!"
      // Increment player left score
      this.scoreSx++;
    }
    if (winner === 2) {
      this.title = "Vince "+this.usernameDx+"!"
      // Increment player right score
      this.scoreDx++;
    }


    // Check if Game is Over
    if (this.scoreSx == this.round || this.scoreDx == this.round) {
      // Get Game Winner
      if (this.scoreSx === this.scoreDx) this.title = "Pareggio!"
      if (this.scoreSx > this.scoreDx) this.title = "Vince "+this.usernameSx+"!"
      else this.title = "Vince "+this.usernameDx+"!"
      this.gameOver = true;

      // Send game to BackEnd API
      await this.gameService.addGame({
        player1Name: this.usernameSx,
        player2Name: this.usernameDx,
        player1Score: this.scoreSx,
        player2Score: this.scoreDx,
      })
    }

    this.loading = false;
  }

  /*
    This function returns a random Weapon
   */
  generateRandonWeapon(): IWeapon {
    return ArrayWeapons[Math.floor(Math.random() * ArrayWeapons.length)];
  }

  /*
    This function take as input the weapons chosen by the players and returns:
    0 if draw;
    1 if player left win;
    3 if player right win;
   */
  checkWinner(weaponSx: IWeapon, weaponDx: IWeapon): number {
    // If the weapons are the same return draw
    if (weaponSx.weapon === weaponDx.weapon) return 0;

    // If player left weapon defeats player right weapon return left winner else right winner
    if (weaponSx.defeat.includes(weaponDx.weapon))
      return 1;
    else
      return 2;

  }

  resetGame() {
    // Reset game state
    this.scoreSx = 0;
    this.scoreDx = 0;
    this.gameOver = false;
    if (this.gameMode == GameModeEnum.ComputerVsComputer) this.title = "Gioca per iniziare";
    if (this.gameMode == GameModeEnum.HumanVsComputer) this.title = "Fai la tua scelta";
  }

  backToMenu() {
    this.router.navigate(['']);
  }

  viewGameList() {
    this.router.navigate(['game-list']);
  }
}
