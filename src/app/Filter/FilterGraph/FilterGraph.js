import { Circle, Layer, Line, Stage } from 'react-konva'
import './FilterGraph.scss'

const FilterGraph = ({
  width = 200,
  height = 100
}) => (
  <div className="filter-graph" style={{ width, height }}>
    <Stage width={ width } height={ height }>
      <Layer>

      </Layer>
    </Stage>
    filter-graph
  </div>
)

export default FilterGraph
