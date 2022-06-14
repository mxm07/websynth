import Knob from 'Components/Knob'

const FilterKnobs = ({
  initialValues: {
    cutoff = 440,
    res = 0.1
  } = {},
  onKnobChange
}) => (
  <div className="filter-knobs">
    <Knob
      label="Cutoff"
      min={8}
      max={22050}
      initialValue={ cutoff }
      logScaling={10}
      suffix="hz"
      onChange={ value => onKnobChange('cutoff', parseFloat(value)) }
    />

    <Knob
      label="Res"
      min={0}
      max={100}
      initialValue={ res * 100 }
      suffix="%"
      onChange={ value => onKnobChange('res', parseFloat(value / 100)) }
    />

  </div>
)

export default FilterKnobs
