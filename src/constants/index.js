// Using the assumption that note A_4 has a frequency of 440Hz to tune
export const TUNING_OCTAVE = 4
export const TUNING_NOTE_INDEX = 9
export const TUNING_FREQUENCY = 440

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]


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
export const KEYBOARD_MAP = [
  'q', '2', 'w', '3', 'e', 'r', '5', 't', '6', 'y', '7', 'u', 'i', '9', 'o', '0', 'p',
  'z', 's', 'x', 'd', 'c', 'f', 'v', 'b', 'h', 'n', 'j', 'm'
]

export const NUM_OSCILLATORS = 2
