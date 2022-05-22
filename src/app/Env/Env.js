import { useState, useCallback } from 'react'
import { Tone } from '../../utils'
import EnvEditor from './EnvEditor'
import EnvKnobs from './EnvKnobs'


const Env = () => {
  const [attack, setAttack] = useState(700)
  const [decay, setDecay] = useState(1200)
  const [sustain, setSustain] = useState(1)
  const [release, setRelease] = useState(500)


  const handleAdsrChange = useCallback(({
    attack: newAttack,
    decay: newDecay,
    sustain: newSustain,
    release: newRelease
  }) => {
    if (newAttack !== attack) { setAttack(newAttack) }
    if (newDecay !== decay) { setDecay(newDecay) }
    if (newSustain !== sustain) { setSustain(newSustain) }
    if (newRelease !== release) { setRelease(newRelease) }
  }, [attack, decay, sustain, release])

  const handleKnobChange = useCallback((type) => (value) => {
    switch (type) {
      case 'attack':
        if (value !== attack) {
          Tone.options.envelope.attack = value / 1000
          setAttack(value)
        }
        break

      case 'decay':
        if (value !== decay) {
          Tone.options.envelope.decay = value / 1000
          setDecay(value)
        }
        break

      case 'sustain':
        if (value !== sustain) {
          Tone.options.envelope.sustain = value / 100
          setSustain(value / 100)
        }

        break

      case 'release':
        if (value !== release) {
          Tone.options.envelope.release = value / 1000
          setRelease(value)
        }

        break

      default:
        break
    }
  }, [attack, decay, sustain, release])

  return (
    <div className="env">
      <EnvEditor
        adsr={{ attack, sustain, decay, release }}
        handleAdsrChange={ handleAdsrChange }
      />

      <EnvKnobs
        initialValues={{ attack, decay, sustain: sustain * 100, release }}
        onKnobChange={ handleKnobChange }
      />
    </div>
  )
}

export default Env
