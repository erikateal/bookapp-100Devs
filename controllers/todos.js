const Todo = require("../models/Todo");

module.exports = {
  getTodos: async (req, res) => {
    console.log(req.user);
    try {
      const todoItems = await Todo.find({ userId: req.user.id });
      const bookRatings = await Todo.find({ bookRating: req.body.bookRating });
      const authors = await Todo.find({ author: req.body.author });
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      })
      const datesAdded = await Todo.find({ dateAdded: req.body.dateAdded })
      res.render("todos.ejs", {
        todos: todoItems,
        left: itemsLeft,
        user: req.user,
        bookRating: bookRatings,
        dateAdded: datesAdded,
        author: authors
      });
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (req, res) => {
    try {
      await Todo.create({
        todo: req.body.todoItem,
        completed: false,
        userId: req.user.id,
        bookRating: req.body.bookRating,
        dateAdded: new Date().toLocaleDateString(),
        author: req.body.author

      });
      console.log("Todo has been added!");
      res.redirect("/todos");
      res.redirect("/todos");
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log("Deleted Todo");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
