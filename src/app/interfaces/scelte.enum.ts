
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
      "Sasso"
    ]
  },
  {
    soggetto: "Forbice",
    image: 'scissors.png',
    batte: [
      "Carta"
    ]
  },
  {
    soggetto: "Sasso",
    image: 'rock.png',
    batte: [
      "Forbice"
    ]
  }
]
