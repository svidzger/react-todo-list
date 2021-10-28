import React from "react";

function TodoTable(props) {
  return (
    <table>
      <tbody>
        {
          props.todoList.map((todo, index) =>
            <tr key={index}>
              <td>{todo.date}</td>
              <td>{todo.desc}</td>
              <td>{todo.priority}</td>
              <td><button onClick={() => props.deleteTodo(index)}>Delete</button></td>
            </tr>)
        }
      </tbody>
    </table>
  );
}

export default TodoTable;