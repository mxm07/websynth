import { Layer, Line, Stage } from 'react-konva'

import './EnvEditor.scss'

const EnvEditor = () => (
  <Stage width={ 300 } height={ 300 }>
    <Layer>
      <Line
        points={[0, 0, 0, 20, 20, 20, 20, 0]}
        fill='#87e1ed'
        stroke="black"
        strokeWidth={ 5 }
        closed={ true }
      ></Line>
    </Layer>
  </Stage>
)

export default EnvEditor
