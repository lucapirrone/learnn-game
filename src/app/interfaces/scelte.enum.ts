export interface Scelta {
  soggetto: string,
  image: string,
  batte: string[]
}

export const scelte: Scelta[] = [
  {
    soggetto: "Carta",
    image: 'paper.png',
    batte: [
      "Sasso",
      "Spock",
    ]
  },
  {
    soggetto: "Forbice",
    image: 'scissors.png',
    batte: [
      "Carta",
      "Lucertola"
    ]
  },
  {
    soggetto: "Sasso",
    image: 'rock.png',
    batte: [
      "Forbice",
      "Lucertola"
    ]
  },
  {
    soggetto: "Lucertola",
    image: 'gecko.png',
    batte: [
      "Spock",
      "Carta"
    ]
  },
  {
    soggetto: "Spock",
    image: 'spock.png',
    batte: [
      "Forbici",
      "Sasso"
    ]
  }
]
