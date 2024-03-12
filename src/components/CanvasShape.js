/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { 
  Stage, 
  Layer, 
  Shape, 
  Line, 
  Text, 
  Circle
} from 'react-konva';

const CanvasShape = () => {
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const isMouseWithinStartingCircle = useRef(false);
  const startingCircleRadius = 8;
  const startingPoint = useRef({ x:-1, y: -1 });

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    startingPoint.x = pos.x;
    startingPoint.y = pos.y;
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const pos = e.target.getStage().getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([pos.x, pos.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());  
    
    const distance = Math.sqrt(
      Math.pow(pos.x - startingPoint.x, 2) + Math.pow(pos.y - startingPoint.y, 2)
    );

    if (distance <= startingCircleRadius) {
      isMouseWithinStartingCircle.current = true;
    } else {
      isMouseWithinStartingCircle.current = false;
    }
  };

  const handleMouseUp = (e) => {
    if (!lines.length) return;
  
    const lastShape = lines[lines.length - 1];
    if (lastShape.tool === 'pen') {
      const firstPoint = lastShape.points.slice(0, 2); // Get the first point
      lastShape.points = [...lastShape.points, ...firstPoint]; // Close the shape by adding the first point at the end
      setLines([...lines.slice(0, -1), lastShape]);
    }

    isDrawing.current = false;

    const pos = e.target.getStage().getPointerPosition();
    const distance = Math.sqrt(
      Math.pow(pos.x - startingPoint.x, 2) + Math.pow(pos.y - startingPoint.y, 2)
    );

    if (distance <= startingCircleRadius) {
      isMouseWithinStartingCircle.current = true;
    } else {
      isMouseWithinStartingCircle.current = false;
      setLines([{ tool, points: [] }])
    }
    
    startingPoint.x = -1;
    startingPoint.y = -1;
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
      fill="#8e70b5" // Set fill color
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
          {isDrawing.current && lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#8e70b5"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
          ))}
          {isDrawing.current &&
              <>
                <Circle 
                  x={startingPoint.x} 
                  y={startingPoint.y} 
                  radius={isMouseWithinStartingCircle.current ? 8 : 5} 
                  fill="#8e70b5" 
                />
                <Circle 
                  x={startingPoint.x} 
                  y={startingPoint.y} 
                  radius={isMouseWithinStartingCircle.current ? 9 : 6} 
                  stroke="black" 
                  strokeWidth={3}
                />
              </>
          }
          {!isDrawing.current && lines.map((line, i) => renderShape(line.points, i))}
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