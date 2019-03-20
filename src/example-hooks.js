/**
 * snapshot
 * ---------
 * draggable
 * @property {boolean} isDragging
 * @property {string} draggingOver e.g. 'column-1'
 * droppable
 * @property {boolean} isDraggingOver
 * @property {string} draggingOverWidth e.g. 'task-1'
 */

// onDragStart
const start = {
  draggableId: 'task-1',
  type: 'TYPE',
  source: {
    droppableId: 'column-1',
    index: 0
  }
};

// onDragUpdate
const update = {
  ...start,
  destination: {
    droppableId: 'column-1',
    index: 1
  }
};

// onDragEnd
const result = {
  ...update,
  reason: 'DROP'
}