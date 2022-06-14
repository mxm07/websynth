import { useCallback, useState } from 'react'

import FilterGraph from './FilterGraph'
import FilterKnobs from './FilterKnobs'

import './Filter.scss'

const Filter = () => {
  const [cutoff, setCutoff] = useState(440)
  const [res, setRes] = useState(0.1)

  const handleKnobChange = useCallback((type, value) => {
    switch (type) {
      case 'cutoff':
        setCutoff(value)
        break

      case 'res':
        setRes(value)
        break

      default:
        break
    }
  }, [setCutoff, setRes])

  return (
    <div className="filter">
      <FilterGraph cutoff={ cutoff } res={ res } />
      <FilterKnobs
        initialValues={{ cutoff, res }}
        onKnobChange={ handleKnobChange }
      />
    </div>
  )
}


export default Filter
