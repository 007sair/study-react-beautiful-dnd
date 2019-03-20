import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  margin-right: 8px;
  background: ${props =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  margin-right: 8px;
  border-radius: 4px;
`;

class Task extends React.Component {
  render() {
    // const isDragDisabled = this.props.task.id === 'task-1'
    const isDragDisabled = false;
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            <Handle style={{ display: "none" }} {...provided.dragHandleProps} />
            {this.props.task.content[0]}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
