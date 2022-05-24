import { useState, useCallback } from 'react'
import { Synth } from 'Utils'
import EnvGraph from './EnvGraph'
import EnvKnobs from './EnvKnobs'

import './Env.scss'

const Env = () => {
  const [attack, setAttack] = useState(700)
  const [decay, setDecay] = useState(1200)
  const [sustain, setSustain] = useState(1)
  const [release, setRelease] = useState(500)

  const adsrValueChanged = useCallback((type, newValue) => {
    switch (type) {
      case 'attack':
        if (newValue !== attack) {
          Synth.set({ envelope: { attack: newValue / 1000 } })
          setAttack(newValue)
        }
        break

      case 'decay':
        if (newValue !== decay) {
          Synth.set({ envelope: { decay: newValue / 1000 } })
          setDecay(newValue)
        }
        break

      case 'sustain':
        if (newValue !== sustain) {
          Synth.set({ envelope: { sustain: newValue / 100 } })

          setSustain(newValue / 100)
        }

        break

      case 'release':
        if (newValue !== release) {
          Synth.set({ envelope: { release: newValue / 1000 } })
          setRelease(newValue)
        }
        break

      default:
        break
    }
  }, [attack, decay, sustain, release])

  const handleAdsrChange = useCallback((newAdsr) => {
    ['attack', 'decay', 'sustain', 'release'].forEach(type => {
      adsrValueChanged(type, newAdsr[type])
    })
  }, [adsrValueChanged])


  const handleKnobChange = useCallback((type) => (value) => {
    adsrValueChanged(type, value)
  }, [adsrValueChanged])


  return (
    <div className="env">
      <EnvGraph
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
