import React from "react";
import ReactDOM from "react-dom";
import initialData from "./initial-data";
import Column from "./column";
import ColumnHorizontal from "./column-horizontal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import "./App.css";

const Title = styled.h3`
  padding: 8px;
`;

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initialData;

  /**
   * DragDropContext
   * 包含以下钩子函数：
   * onDragStart：拖动开始
   * onDragUpdate：拖动中的变化
   * onDragEnd：（必选）拖拽结束，这个钩子的责任是同步应用由拖动导致的更改
   * onBeforeDragStart：（不常用）就在onDragStart之前，并且可以用于进行表格 重新排序的尺寸锁定.
   * 所有钩子都有第二个参数：provided: <object>
   */

  onDragStart = start => {
    // document.body.style.color = 'orange';
    // document.body.style.transition = 'background-color 0.2s ease';

    // homeIndex: 配合 isDropDisabled 使用
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
    this.setState({
      homeIndex
    });
  };

  onDragUpdate = update => {
    // const { destination } = update;
    // const opacity = destination ? destination.index / Object.keys(this.state.tasks).length : 0;
    // document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  onDragEnd = result => {
    // reset styles
    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = `inherit`;

    this.setState({
      homeIndex: null
    });

    const { draggableId, source, destination, type } = result;

    // 如果没有目标区域，不做任何操作
    if (!destination) {
      return;
    }

    // 如果目标区域和原区域一致，说明没有移动，不做任何操作
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // 拖拽列
    if (type === "column") {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...this.state,
        columnOrder: newColumnOrder
      };
      this.setState(newState);
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    // 同列中的task拖拽
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      return;
    }

    // 移动一项去另外一个列中
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    this.setState(newState);
  };

  render() {
    return (
      <div>
        <Title>纵向</Title>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
        >
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {provided => (
              <Container {...provided.droppableProps} ref={provided.innerRef}>
                {this.state.columnOrder.map((columnId, index) => {
                  const column = this.state.columns[columnId]; // obj
                  const tasks = column.taskIds.map(
                    taskId => this.state.tasks[taskId]
                  );

                  // 将导致元素只能向右拖入，无法向左拖入
                  // const isDropDisabled = index < this.state.homeIndex;
                  const isDropDisabled = false;

                  return (
                    <Column
                      key={column.id}
                      column={column}
                      index={index}
                      tasks={tasks}
                      isDropDisabled={isDropDisabled}
                    />
                  );
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
        <Title>横向</Title>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
        >
          <Container>
            {this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId]; // obj
              const tasks = column.taskIds.map(
                taskId => this.state.tasks[taskId]
              );

              // 将导致元素只能向右拖入，无法向左拖入
              // const isDropDisabled = index < this.state.homeIndex;
              const isDropDisabled = false;

              return (
                <ColumnHorizontal
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  isDropDisabled={isDropDisabled}
                />
              );
            })}
          </Container>
        </DragDropContext>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
