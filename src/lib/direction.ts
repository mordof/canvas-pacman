import { Direction } from '../controller';

export const directionIsInverted = (a: Direction, b: Direction) => {
  if (a === 'left' && b === findOppositeDirection(a)) return true;
  if (a === 'right' && b === findOppositeDirection(a)) return true;
  if (a === 'up' && b === findOppositeDirection(a)) return true;
  if (a === 'down' && b === findOppositeDirection(a)) return true;
  return false;
}

export const findOppositeDirection = (direction: Direction) => {
  if (direction === 'left') return 'right';
  if (direction === 'right') return 'left';
  if (direction === 'up') return 'down';
  if (direction === 'down') return 'up;'
}