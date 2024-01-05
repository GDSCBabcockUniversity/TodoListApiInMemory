const { Router } = require("express");
// Router module to make ROuters from express

const toDoRouter = Router();
const Lists = require("../assets/list");

//Call To get all todos
toDoRouter.get("", async (_, res) => {
  try {
    var todos = Lists;

    //If no todos are found
    if (todos.length == 0) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    //Response for a successful call
    return res.status(200).json({
      status: true,
      message: "Success",
      data: todos,
    });
  } catch (error) {
    // Response to any error found
    return res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
});

// To add a new todo
toDoRouter.post("/AddTask", async (req, res) => {
  try {
    var random = Math.random();

    // Validate if there is content in the title
    if (!req.body?.title) {
      return res.status(400).json({
        status: false,
        message: "Type in a valid Title",
      });
    }
    // Creating new TODO object
    var todo = {
      id: 1 + random,
      title: req.body?.title,
      description: req.body?.description,
      timecreated: Date.now().toString(),
      timeupdated: Date.now().toString(),
      isCompleted: false,
    };

    // Pushing the todo list to the array
    Lists.push(todo);

    // Success Response
    return res.status(201).json({
      status: true,
      message: "Successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
});

// Get a particular Todo using Id
toDoRouter.get("/:id", async (req, res) => {
  try {
    // Getting the unique todo
    var todo = Lists.find((x) => x.Id == req.params?.id);

    // Checking if a todo exists with the Id
    if (!todo) {
      return res.status(404).json({
        status: false,
        message: "No to do list found",
      });
    }

    // Success Response
    return res.status(200).json({
      status: true,
      message: "Successful",
      data: { todo },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
});

// Update a todo
toDoRouter.patch("/:id", async (req, res) => {
  try {
    var todo = Lists.find((x) => x.Id == req.params.id);

    if (!todo) {
      return res.status(404).json({
        status: false,
        message: "No to do list found",
      });
    }

    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.dateUpdated = Date.now().toString();

    return res.status(200).json({
      status: true,
      message: "Successful",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
});

// Deleting a todo using Id
toDoRouter.delete("/Delete/:id", async (req, res) => {
  try {
    var todoIndex = Lists.findIndex((x) => x.Id == req.params.id);

    if (todoIndex < 0) {
      return res.status(404).json({
        status: false,
        message: "No to do list found",
      });
    }

    Lists.splice(todoIndex, 1);

    return res.status(200).json({
      status: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
});

// Mark a Todo list to be completed
toDoRouter.patch("/MarkCompletion/:id", async (req, res) => {
  try {
    var todo = Lists.find((x) => x.Id == req.params.id);

    if (!todo) {
      return res.status(404).json({
        status: false,
        message: "No to do list found",
      });
    }

    todo.IsCompleted = true;
    todo.dateUpdated = Date.now().toString();

    return res.status(200).json({
      status: true,
      message: "Successfully updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
});

module.exports = toDoRouter;
