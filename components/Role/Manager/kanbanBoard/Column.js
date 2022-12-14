import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
/* import { adminService } from "../../../../service/adminService";
import { useRouter } from "next/router"; */

const Column = ({ droppableId, column, collaborator }) => {
 /*  console.log("MOVE", column); */

  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : column.color,
              padding: 4,

              minHeight: 1000,
              border: "2px dashed #ccc",
              borderRadius: "4px",
            }}
          >
            {column?.items?.map((item, index) => {
              return (
                <TaskCard
                  key={item._id}
                  item={item}
                  index={index}
                  collaborator={collaborator}
                  column={column.name}
                />
              );
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

Column.propTypes = {
  column: PropTypes.object,
  droppableId: PropTypes.string,
};

export default memo(Column);
