# LearnnGame

Questo è il progetto della webapp che rappresenta il gioco "Carta-Sasso-Forbice".
E' sviluppato con il framework Angular 12 e con la libreria css Bootstrap 4.5.
La grafica è semplice, minimale e funzionale. Gli stili sono descritti in SCSS.

E' possibile clonare la repository per avviarla in locale, altrimenti è possibile visualizzarla ai seguenti indirizzi:
https://d3vwqmkf4acjlh.cloudfront.net (ambiente di sviluppo)
https://d2r4y4rij433g8.cloudfront.net/ (ambiente di produzione)

L'architettura della app permette una semplice estensione delle regole del gioco aggiungendo 
(rimuovendo o modificando) altre "Scelte".
Il file "src/app/interfaces/scelte.enum.ts" contiene la configurazione di tutte le scelte disponibili che
vengono visualizzate nel gioco.
Non cè alcun bisogno di modificare l'algoritmo che determina il vincitore tra le due scelte.

Con questo progetto ho voluto dimostrare il più possibile le mie competenze di sviluppo in ambito web.
Infatti oltre ad aver sviluppato il gioco sottoforma di webapp ho anche creato una infrastruttura serverless
basato sui servizi del provider AWS.
L'infrastruttura è descritta sottoforma di IaaC (Infrastructure as a Code) ed è visionabile sulla repository
GitHub pubblica all'indirizzo https://github.com/lucapirrone/learnn-game-infr-fe
E' possibile leggere di più riguardo il progetto dell'infrastruttura nel relativo file readme. 

Infine ho applicato a questo progetto le pratiche di CI/CD (Continuous Integration/Continuous Delivery) tramite
gli strumenti di Git, GitHub e Seed.run.

###Continuous Integration:
Entrambe le repository Git (https://github.com/lucapirrone/learnn-game-infr-fe e https://github.com/lucapirrone/learnn-game)
hanno due rami distinti (main e prod) che equivalgono rispettivamente a due ambienti separati (sviluppo e produzione).

###Continuous Delivery:
Entrambe le repository Git hanno implementato un sistema di deployment automatico che viene eseguito ad un evento di push.
  - La repository learnn-game-infr-fe utilizza il servizio Seed.run che effettua automaticamente il deploy automatico di 
    entrambi gli ambienti (o rami git) su un account AWS (di cui sono il proprietario). In questo modo vengono create due 
    infrastrutture distinte da utilizzare in fase di sviluppo ed in fase di produzione.
  - La repository learnn-game utilizza le Actions di GitHub per effettuare automaticamente il deploy della webapp angular 
    sulla relativa infrastruttura AWS (il ramo main sulla infrastruttura aws di sviluppo ed il ramo prod su quella di produzione).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

