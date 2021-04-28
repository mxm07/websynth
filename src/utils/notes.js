import {
  TUNING_OCTAVE,
  TUNING_NOTE_INDEX,
  TUNING_FREQUENCY,
  NOTES
} from 'Constants'

export const calculateNoteFrequency = noteIndex => {
  if (!noteIndex) {
    return 0
  }

  const absoluteTuningNoteIndex = TUNING_OCTAVE * 12 + TUNING_NOTE_INDEX
  const noteIndexDelta = noteIndex - absoluteTuningNoteIndex
  const noteFrequency = TUNING_FREQUENCY * Math.pow(2, noteIndexDelta / 12)

  return noteFrequency
}

export const keyToNoteString = key => {
  const octave = Math.floor(key / 12)
  const note = NOTES[key % 12]

  return `${note}${octave}`
}

export const gainValueToDecibels = value => 20 * (Math.log(value) / Math.log(10))
export const decibelsToGainValue = decibels => Math.pow(10, decibels / 20)
