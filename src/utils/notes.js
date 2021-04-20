// Using the assumption that note A_4 has a frequency of 440Hz to tune
const TUNING_OCTAVE = 4
const TUNING_NOTE_INDEX = 9
const TUNING_FREQUENCY = 440

export const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]

export const calculateNoteFrequency = (noteIndex) => {
  const absoluteTuningNoteIndex = TUNING_OCTAVE * 12 + TUNING_NOTE_INDEX
  const noteIndexDelta = noteIndex - absoluteTuningNoteIndex
  const noteFrequency = TUNING_FREQUENCY * Math.pow(2, noteIndexDelta / 12)

  return noteFrequency
}
