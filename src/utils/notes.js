import {
  TUNING_OCTAVE,
  TUNING_NOTE_INDEX,
  TUNING_FREQUENCY
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

export const gainValueToDecibels = value => 20 * (Math.log(value) / Math.log(10))
export const decibelsToGainValue = decibels => Math.pow(10, decibels / 20)
