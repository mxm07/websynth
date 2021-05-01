export const TUNING_OCTAVE = 4
export const TUNING_NOTE_INDEX = 9
export const TUNING_FREQUENCY = 440
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]

export const calculateNoteFrequency = (noteIndex: number): number => {
  const absoluteTuningNoteIndex = TUNING_OCTAVE * 12 + TUNING_NOTE_INDEX
  const noteIndexDelta = noteIndex - absoluteTuningNoteIndex
  const noteFrequency = TUNING_FREQUENCY * Math.pow(2, noteIndexDelta / 12)

  return noteFrequency
}

export const getNoteName = (note: number): string => {
  const octave = Math.floor(note / 12)
  const name = NOTES[note % 12]

  return `${name}${octave}`
}


