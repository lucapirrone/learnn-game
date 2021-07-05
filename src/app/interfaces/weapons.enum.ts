export interface IWeapon {
  weapon: string, // Weapon name
  image: string,  // Weapon image
  defeat: string[]  // Weapon Array that defeats
}

export enum GameModeEnum {
  HumanVsComputer,
  ComputerVsComputer
}

export const ArrayWeapons: IWeapon[] = [
  {
    weapon: "Carta",
    image: 'paper.png',
    defeat: [
      "Sasso",
      "Spock",
    ]
  },
  {
    weapon: "Forbice",
    image: 'scissors.png',
    defeat: [
      "Carta",
      "Lucertola"
    ]
  },
  {
    weapon: "Sasso",
    image: 'rock.png',
    defeat: [
      "Forbice",
      "Lucertola"
    ]
  },
  {
    weapon: "Lucertola",
    image: 'gecko.png',
    defeat: [
      "Spock",
      "Carta"
    ]
  },
  {
    weapon: "Spock",
    image: 'spock.png',
    defeat: [
      "Forbici",
      "Sasso"
    ]
  }
]
