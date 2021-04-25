// Using the assumption that note A_4 has a frequency of 440Hz to tune
const TUNING_OCTAVE = 4
const TUNING_NOTE_INDEX = 9
const TUNING_FREQUENCY = 440

export const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]


/*
 _______________________________________                        ____________________________
|  | | | |  |  | | | | | |  |  | | | |  |                      |  | | | | | |  |  | | | |  |
|  | | | |  |  | | | | | |  |  | | | |  |                      |  | | | | | |  |  | | | |  |
|  |2| |3|  |  |5| |6| |7|  |  |9| |0|  |                      |  |s| |d| |f|  |  |h| |j|  |
|  |_| |_|  |  |_| |_| |_|  |  |_| |_|  | next rows of keys -> |  |_| |_| |_|  |  |_| |_|  |
|   |   |   |   |   |   |   |   |   |   |                      |   |   |   |   |   |   |   |
| q | w | e | r | t | y | u | i | o | p |                      | z | x | c | v | b | n | m |
|___|___|___|___|___|___|___|___|___|___|                      |___|___|___|___|___|___|___|

*/
export const keyboardMap = [
  'q', '2', 'w', '3', 'e', 'r', '5', 't', '6', 'y', '7', 'u', 'i', '9', 'o', '0', 'p',
  'z', 's', 'x', 'd', 'c', 'f', 'v', 'b', 'h', 'n', 'j', 'm'
]


export const calculateNoteFrequency = noteIndex => {
  if (!noteIndex) {
    return 0
  }

  const absoluteTuningNoteIndex = TUNING_OCTAVE * 12 + TUNING_NOTE_INDEX
  const noteIndexDelta = noteIndex - absoluteTuningNoteIndex
  const noteFrequency = TUNING_FREQUENCY * Math.pow(2, noteIndexDelta / 12)

  return noteFrequency
}

export const gainValueToDecibels = value => 20 * (Math.log(value) / Math.log(10))
export const decibelsToGainValue = decibels => Math.pow(10, decibels / 20)
