/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { 
  Stage, 
  Layer, 
  Shape, 
  Line,  
  Circle,
  Image as KonvaImage
} from 'react-konva';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { CanvasContext } from '@contexts';
import { useImportZip } from '@hooks';
import { createBlackImageDataUrl, dataURLtoBlob } from '@utils';
import { TOOLS, STARTING_CIRCLE_RADIUS, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from '@constants';

import ToolBox from './ToolBox';

import styles from './styles.module.css';

const Canvas = () => {
  const { tool } = useContext(CanvasContext);
  const [image, setImage] = useState(new Image());
  const { imageDimensions, imageSrc, imageBlob, importZip } = useImportZip();
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [undoShapes, setUndoShapes] = useState([]);
  const [redoShapes, setRedoShapes] = useState([]);
  const isMouseWithinStartingCircle = useRef(false);
  const isDrawing = useRef(false);
  const startingPoint = useRef({ x:-1, y: -1 });
  const drawingLayer = useRef();

  const exportZip = () => {
    const zip = new JSZip();
    const imgFolder = zip.folder("images");

    const dataURL = drawingLayer.current.toDataURL({
      pixelRatio: 1,
      mimeType: "image/png",
    },);

    const maskBlob = dataURLtoBlob(dataURL);
    imgFolder.file("mask.png", maskBlob, { binary: true });
    imgFolder.file("original_image.png", imageBlob, { binary: true });

    zip.generateAsync({ type: "blob" })
    .then(function(content) {
      saveAs(content, "images.zip");
    });
  };

  const handleMouseDown = (e) => {
    if(tool === TOOLS.PEN) {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
      startingPoint.x = pos.x;
      startingPoint.y = pos.y;
    }
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) return;

    const pos = e.target.getStage().getPointerPosition();

    if (tool === TOOLS.PEN) {
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([pos.x, pos.y]);

      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
      
      const distance = Math.sqrt(
        Math.pow(pos.x - startingPoint.x, 2) + Math.pow(pos.y - startingPoint.y, 2)
      );

      if (distance <= STARTING_CIRCLE_RADIUS) {
        isMouseWithinStartingCircle.current = true;
      } else {
        isMouseWithinStartingCircle.current = false;
      }
    }
  };

  const handleMouseUp = (e) => {
    if (!isDrawing.current || !lines.length) return;

    isDrawing.current = false;

    const pos = e.target.getStage().getPointerPosition();
    const distance = Math.sqrt(
      Math.pow(pos.x - startingPoint.x, 2) + Math.pow(pos.y - startingPoint.y, 2)
    );

    if (distance <= STARTING_CIRCLE_RADIUS) {
      isMouseWithinStartingCircle.current = true;
      const lastShape = lines[lines.length - 1];
      if (tool === TOOLS.PEN) {
        const firstPoint = lastShape.points.slice(0, 2); // Get the first point
        lastShape.points = [...lastShape.points, ...firstPoint]; // Close the shape by adding the first point at the end
        setLines([]);
        setUndoShapes([...shapes]);
        setShapes([...shapes, ...lines.slice(0, -1), lastShape]);
      }
    } else {
      isMouseWithinStartingCircle.current = false;
      if (tool === TOOLS.PEN) {
        setLines([]);
      }
    }
    
    startingPoint.x = -1;
    startingPoint.y = -1;
  };

  useEffect(() => {
    switch (tool) {
      case TOOLS.UNDO:
        setRedoShapes([...shapes]);
        setShapes([...undoShapes]);
        break;

      case TOOLS.REDO:
        setUndoShapes([...shapes]);
        setShapes([...redoShapes]);
        break;

      case TOOLS.EXPORT:
        exportZip();
        break;
      default:
        break;
    }
  },[tool])

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
      opacity={0.6} // Set opacity
    />
  );

  useEffect(() => {   
    if (!imageSrc) {
      image.src = createBlackImageDataUrl(DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT)
    } else {
      image.src = imageSrc;
    }
  }, [imageSrc, imageBlob, importZip]);
  
  return (
    <div className={styles.container}>
      <ToolBox importZip={importZip} exportZip={exportZip} />
      <Stage 
        width={imageDimensions.width || DEFAULT_CANVAS_WIDTH}
        height={imageDimensions.height || DEFAULT_CANVAS_HEIGHT}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        {image && <Layer>
          <KonvaImage
            image={image}
            width={imageDimensions.width  || DEFAULT_CANVAS_WIDTH}
            height={imageDimensions.height || DEFAULT_CANVAS_HEIGHT}
          />
        </Layer>}
        <Layer ref={drawingLayer}>
          {isDrawing.current && lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#8e70b5"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={line.tool === TOOLS.PEN ? 'source-over' : ''}
                opacity={0.6}
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
          {shapes.map((shape, i) => renderShape(shape.points, i))}
        </Layer>
      </Stage>
    </div>
  )
};

export default Canvas;