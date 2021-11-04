import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { format } from "date-fns";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({
    date: null,
    desc: "",
    priority: "",
  });

  const gridRef = useRef();

  const addTodo = () => {
    setTodoList([todo, ...todoList]);
    setTodo({
      date: null,
      desc: "",
      priority: "",
    });
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodoList(
        todoList.filter(
          (todo, index) =>
            index !== gridRef.current.getSelectedNodes()[0].childIndex
        )
      );
    } else {
      alert("Empty field");
    }
  };

  const columns = [
    { field: "date", sortable: true, filter: true, floatingFilter: true },
    { field: "desc", sortable: true, filter: true, floatingFilter: true },
    {
      field: "priority",
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellClassRules: {
        "priority-high": (params) => params.value === "High",
        "priority-medium": (params) => params.value === "Medium",
        "priority-low": (params) => params.value === "Low",
      },
    },
  ];

  const inputChanged = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        style={{ marginTop: 20 }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={todo.date}
            onChange={(date) => {
              const formattedDate = format(date, "dd MMM, yyyy");
              setTodo({ ...todo, date: formattedDate });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          label="Descriptions"
          name="desc"
          value={todo.desc}
          onChange={inputChanged}
        />
        <TextField
          label="Priority"
          name="priority"
          value={todo.priority}
          onChange={inputChanged}
        />

        <Button variant="outlined" size="small" onClick={addTodo}>
          Add
        </Button>
        <Tooltip title="Choose ToDo to delete">
          <Button
            endIcon={<DeleteIcon />}
            variant="outlined"
            color="error"
            size="small"
            onClick={deleteTodo}
          >
            Delete
          </Button>
        </Tooltip>
      </Stack>

      <div
        className="ag-theme-material"
        style={{ height: 400, width: 600, margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          animateRows={true}
          rowData={todoList}
          columnDefs={columns}
        />
      </div>
    </div>
  );
}

export default TodoList;
