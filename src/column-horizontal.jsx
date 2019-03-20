import React from "react";
import styled from "styled-components";
import TaskHorizontal from "./task-horizontal";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  min-height: 100px;
  display: flex;
`;

class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable 
          droppableId={this.props.column.id} 
          isDropDisabled={this.props.isDropDisabled}
          direction="horizontal"
          // type：相同类型的组件才会被允许放入
          // type={this.props.column.id === 'column-3' ? 'done' : 'active'}
        >
          {(provided, snapshot) => (
            <TaskList 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <TaskHorizontal key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default Column;
