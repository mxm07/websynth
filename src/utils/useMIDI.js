import { useCallback, useEffect, useState } from 'react'

const MIDI_INPUT_NOTE_ON = 144
const MIDI_INPUT_NOTE_OFF = 128

const useMIDI = () => {
  const [midiState, setMidiState] = useState([false])

  const noteOn = useCallback((note, velocity) =>
    setMidiState([true, note, velocity]), [setMidiState])


  const noteOff = useCallback((note, velocity) =>
       setMidiState([false, note, velocity]), [setMidiState])



  const getMIDIMessage = useCallback(message => {
    const {
      data
    } = message

    // Velocity data may not be included with note off command
    const [command, note, velocity = 0] = data

    switch (command) {
      case MIDI_INPUT_NOTE_ON:
        noteOn(note, velocity)
        break
      case MIDI_INPUT_NOTE_OFF:
        noteOff(note, velocity)
        break
      default:
        break
    }
  }, [noteOff, noteOn])

  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then((midiAccess) => {
        for (let input of midiAccess.inputs.values()) {
          input.onmidimessage = getMIDIMessage;
        }
      }).catch((error) => {
        console.log(`MIDI access error ${error}`)
      })
    }
  }, [getMIDIMessage])

  return midiState
}

export default useMIDI
