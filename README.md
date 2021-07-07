# LearnnGame

## Introduzione

Questo è il progetto della webapp che rappresenta il gioco "Carta-Sasso-Forbice". Ha solo scopo dimostrativo delle competenze
per la candidatura a Learnn.  
Il progetto è composto da 3 repository:
- FrontEnd: https://github.com/lucapirrone/learnn-game;
- Infrastruttura Hosting FrontEnd: https://github.com/lucapirrone/learnn-game-infr-fe;  
- BackEnd: https://github.com/lucapirrone/learnn-game-be;  

Le repository sono tutte pubbliche per cui è possibile clonarle per avviarle in locale. Per completezza della
dimostrazione l'intero progetto è stato deployato su AWS ed è disponibile ai seguenti indirizzi:  
https://d3vwqmkf4acjlh.cloudfront.net (ambiente di sviluppo)  
https://d2r4y4rij433g8.cloudfront.net (ambiente di produzione)  

Con questo progetto ho cercato di dimostrare le mie competenze in ambito di sviluppo web, in particolare in:
- Sviluppo FrontEnd (Angular);
- Sviluppo BackEnd;
- Infrastruttura AWS e servizi Serverless;
- Utilizzo delle pratiche di CI/CD;

## FrontEnd

Il FrontEnd è sviluppato con il framework Angular 12 e con la libreria css Bootstrap 4.5.  
La grafica è semplice, minimale e funzionale. Gli stili sono descritti in SCSS.

L'architettura della app permette una semplice estensione delle regole del gioco aggiungendo 
(rimuovendo o modificando) altre "Armi".  
Il file "src/app/interfaces/weapons.enum.ts" contiene la configurazione di tutte le scelte disponibili che
vengono visualizzate nel gioco.  
Non cè alcun bisogno di modificare l'algoritmo che determina il vincitore tra le due scelte.

## Infrastruttura FrontEnd

L'infrastruttura su cui è hostata la webapp è basata sui servizi serverless del provider AWS.  
Nello specifico è composta dai servizi AWS S3 (Storage e Hosting) + AWS CloudFront (CDN e HTTPS).  
L'infrastruttura è descritta sottoforma di IaaC (Infrastructure as a Code) ed è visionabile sulla repository
GitHub pubblica all'indirizzo https://github.com/lucapirrone/learnn-game-infr-fe.  
E' possibile leggere di più riguardo il progetto dell'infrastruttura nel relativo file readme. 

## BackEnd

Per quanto riguarda il BackEnd ho sviluppato le REST Api in TypeScript utilizzando Serverless Framework.  
Anche essa utilizza servizi serverless del provider cloud AWS (Api Gateway + Lambda) e database MongoDB Atlas.  
La repository del backend è pubblica all'indirizzo https://github.com/lucapirrone/learnn-game-be.  

## CI/CD

Infine ho applicato a questo progetto le pratiche di CI/CD (Continuous Integration/Continuous Delivery) tramite
gli strumenti di Git, GitHub e Seed.run.

###Continuous Integration:
Tutte le repository Git (https://github.com/lucapirrone/learnn-game-infr-fe, https://github.com/lucapirrone/learnn-game e https://github.com/lucapirrone/learnn-game-be)
hanno due rami distinti (main e prod) che equivalgono rispettivamente a due ambienti separati (sviluppo e produzione).   
In questo modo è possibile avere una continua integrazione di nuove funzionalità sull'applicazione nell'ambiente di sviluppo,
mentre quella in ambiente di produzione è pubblica e stabile.

###Continuous Delivery:
Tutte repository Git hanno implementato un sistema di deployment automatico che viene eseguito ad un evento di push.
  - La repository learnn-game-infr-fe utilizza il servizio Seed.run che effettua automaticamente il deploy automatico di 
    entrambi gli ambienti (o rami git) su un account AWS (di cui sono il proprietario). In questo modo vengono create due 
    infrastrutture distinte da utilizzare in fase di sviluppo ed in fase di produzione.
  - La repository learnn-game utilizza le Actions di GitHub per effettuare automaticamente il deploy della webapp angular 
    sulla relativa infrastruttura AWS (il ramo main sulla infrastruttura aws di sviluppo ed il ramo prod su quella di produzione).
  - La repository learnn-game-be utilizza il servizio Seed.run che effettua automaticamente il deploy automatico di
    entrambi gli ambienti (o rami git) su un account AWS (di cui sono il proprietario). In questo modo si hanno due
    API differenti da utilizzare per la fase di sviluppo e per la fase di produzione.
    
Questa pratica permette di ridurre notevolmente il tempo di deployment delle modifiche e soprattutto di automatizzare il processo per ridurre al minimo
la possibilità di errori.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

