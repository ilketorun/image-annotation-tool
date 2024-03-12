/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { 
  Stage, 
  Layer, 
  Shape, 
  Line, 
  Text 
} from 'react-konva';

const CanvasShape = () => {
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());   
  };

  const handleMouseUp = () => {
    if (!lines.length) return;
  
    const lastShape = lines[lines.length - 1];
    if (lastShape.tool === 'pen') {
      const firstPoint = lastShape.points.slice(0, 2); // Get the first point
      lastShape.points = [...lastShape.points, ...firstPoint]; // Close the shape by adding the first point at the end
      setLines([...lines.slice(0, -1), lastShape]);
    }

    isDrawing.current = false;
  };

  const renderShape = (points, index) => (
    <Shape
      key={index}
      sceneFunc={(context, shape) => {
        context.beginPath();
        for (let i = 0; i < points.length; i += 2) {
          const x = points[i];
          const y = points[i + 1];
          if (i === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }
        context.closePath(); // Optional: Close the path if you want a closed shape
        context.fillStrokeShape(shape); // This method fills and strokes the shape
      }}
      fill="#00D2FF" // Set fill color
      stroke="black" // Set stroke color
      strokeWidth={4} // Set stroke width
    />
  );
  

  

  return (
    <div>
      <Stage 
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
          ))}
          {/* {lines.map((line, i) => renderShape(line.points, i))} */}

        </Layer>
      </Stage>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  )
}

export default CanvasShape;