const router = require("express").Router();
const { response } = require("express");
let Todo = require("../models/todo");

router.route("/").post((req, res) => {
    const { taskName, priority } = req.body;
  
    const newTodo = new Todo({
      taskName, 
      priority,
    });
  
    newTodo.save()
      .then(() => {
        res.json("Task Added");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Error adding task" });
      });
  });
  


router.route("/").get((req,res)=>{

    Todo.find().then((todos)=>{
        res.json(todos)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/:id").put(async (req, res) => {
    let todoId = req.params.id;
    const { taskName, priority } = req.body; // Destructure taskName and priority
  
    const updateDetails = {
      taskName,
      priority,
    };
  
    try {
      await Todo.findByIdAndUpdate(todoId, updateDetails);
      res.status(200).send({ status: "Task Name and Priority Updated" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ status: "Error with updating task details", error: err.message });
    }
  });
  
  router.route("/status/:id").put(async (req, res) => {
    let todoId = req.params.id;
    const { status } = req.body; // Destructure status
  
    try {
      await Todo.findByIdAndUpdate(todoId, { status });
      res.status(200).send({ status: "Task Status Updated" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ status: "Error with updating task status", error: err.message });
    }
  });
  

router.route("/:id").delete(async (req, res) => {
    let todoId = req.params.id;

    await Todo.findByIdAndDelete(todoId)
    .then(() => {
        res.status(200).send({status: "Task deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete item",error:err.message})
    })
})


router.route("/:id").get(async(req, res) =>{
    let todoId = req.params.id;
    const todo = await Todo.findById(todoId)
    .then((todo)=>{
        res.status(200).send({status: "Task fetched", todo})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get Item",error:err.message})
    })
})

module.exports = router;