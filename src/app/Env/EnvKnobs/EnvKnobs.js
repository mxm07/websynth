import Knob from 'Components/Knob'

const timeFormatter = value => value < 1000 ? `${value}ms` : `${parseInt(value / 1000).toFixed(0)}s`

const EnvKnobs = ({
  initialValues: {
    attack,
    decay,
    sustain,
    release
  },
  onKnobChange
}) => (
  <div className="env-knobs">
    <Knob
      label="Attack"
      min={0}
      max={30000}
      initialValue={ attack }
      logScaling={10}
      format={ timeFormatter }
      onChange={ value => onKnobChange('attack')(parseFloat(value)) }
    />

    <Knob
      label="Decay"
      min={0}
      max={30000}
      initialValue={ decay }
      logScaling={10}
      format={ timeFormatter }
      onChange={ value => onKnobChange('decay')(parseFloat(value))  }
    />

    <Knob
      label="Sustain"
      min={0}
      max={100}
      initialValue={ sustain }
      suffix="%"
      onChange={ value => onKnobChange('sustain')(parseFloat(value)) }
    />

    <Knob
      label="Release"
      min={0}
      max={30000}
      initialValue={ release }
      logScaling={10}
      format={ timeFormatter }
      onChange={ value => onKnobChange('release')(parseFloat(value)) }
    />
  </div>
)

export default EnvKnobs
