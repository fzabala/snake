import { useCallback, useEffect, useRef, useState } from 'react';
import { animateSnake, changeDirection, useAppDispatch, useAppSelector } from "../../store";
import { BlockType, SnakeKeysType } from '../../types';
import './CanvasGame.component.scss';

const BLOCK_SIZE = 20;

type CanvasGamePropsType = {
  width: number,
  height: number,
}

export const CanvasGame = ({ width, height }: CanvasGamePropsType) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const dispatch = useAppDispatch();

  const { snake, fruit, isGameOver, timing, level } = useAppSelector((store) => store.snake);

  const WIDTH = width * BLOCK_SIZE;
  const HEIGHT = height * BLOCK_SIZE;

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
  }, [context]);

  useEffect(() => {
    document.addEventListener("keydown", ev => {
      dispatch(changeDirection(ev.key as SnakeKeysType))
    });
    return () => {
      document.removeEventListener("keydown", ev => console.log(ev));
    }
  }, [context, dispatch]);

  const drawBlock = useCallback((block: BlockType) => {
    if (context) {
      context.fillStyle = block.fillColor;
      context.strokeStyle = block.strokeStyle;
      context?.fillRect(block.x * BLOCK_SIZE, block.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      context?.strokeRect(block.x * BLOCK_SIZE, block.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
  }, [context]);

  const drawBlocks = useCallback(() => {
    snake.blocks.forEach((block: BlockType) => drawBlock(block))
    drawBlock(fruit)
  }, [snake, fruit, drawBlock]);

  useEffect(() => {
    if (context) {
      context.clearRect(0, 0, WIDTH, HEIGHT);
      drawBlocks();
    }
  }, [context, snake, drawBlocks, WIDTH, HEIGHT]);

  useEffect(() => {
    if (context && !intervalId && timing) {
      const interval = setInterval(() => {
        dispatch(animateSnake())
      }, timing);
      setIntervalId(interval);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [dispatch, context, intervalId, timing]);

  useEffect(() => {
    if (isGameOver && intervalId) {
      clearInterval(intervalId)
    }
  }, [isGameOver, intervalId]);

  return (
    <div className="CanvasGame">
      <p>Level: {level}</p>
      <canvas
        height={HEIGHT}
        width={WIDTH}
        ref={canvasRef}
      />
    </div>
  );
};
