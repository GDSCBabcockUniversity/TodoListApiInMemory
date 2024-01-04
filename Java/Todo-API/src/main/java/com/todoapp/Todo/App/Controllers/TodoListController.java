package com.todoapp.Todo.App.Controllers;

import com.todoapp.Todo.App.Dto.TodoListDto;
import com.todoapp.Todo.App.Entities.TodoListModel;
import com.todoapp.Todo.App.Repositories.TodoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TodoListController {
    @Autowired
    private TodoListRepository todoListRepository;

    @GetMapping("/todos")
    public ResponseEntity<List<TodoListModel>> getAllTodos() {
        List<TodoListModel> todos = todoListRepository.findAll();
        if (todos.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(todos);
    }

    @PostMapping("/addtodos")
    public ResponseEntity<List<TodoListModel>> addTodo(@RequestBody TodoListDto todoListDto){
        TodoListModel todo = new TodoListModel();
        todo.setTitle(todoListDto.getTitle());
        todo.setDescription(todoListDto.getDescription());
        todo.setTimeCreated(new Date());
        todo.setTimeUpdated(new Date());
        todo.setCompleted(false);
        todoListRepository.save(todo);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/todos/{id}")
    public ResponseEntity<TodoListModel> getSingleTodo(@PathVariable Integer id){
        TodoListModel todo = todoListRepository.findById(id).orElse(null);
        if (todo == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(todo);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TodoListModel> editTodo(@PathVariable Integer id, @RequestBody TodoListDto todoListDto){
         TodoListModel todo = todoListRepository.findById(id).orElse(null);
        if (todo == null) return ResponseEntity.notFound().build();
        if (todoListDto.getTitle() != null) {
            todo.setTitle(todoListDto.getTitle());
        }
        if (todoListDto.getDescription() != null) {
            todo.setDescription(todoListDto.getDescription());
        }
        todo.setTitle(todoListDto.getTitle());
        todo.setDescription((todoListDto.getDescription()));
        todo.setTimeUpdated(new Date());
        todoListRepository.save(todo);
        return ResponseEntity.ok(todo);
    }

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<TodoListModel> deleteTodo(@PathVariable Integer id){
        TodoListModel todo = todoListRepository.findById(id).orElse(null);
        if (todo == null) return ResponseEntity.notFound().build();
        todoListRepository.delete(todo);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/todos")
    public ResponseEntity<List<TodoListModel>> deleteAllTodos(){
        List<TodoListModel> todo = todoListRepository.findAll();
        if (todo.isEmpty()) return ResponseEntity.notFound().build();
        todoListRepository.deleteAll(todo);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/markcompleted/{id}")
    public ResponseEntity<TodoListModel> completeTodo(@PathVariable Integer id){
        TodoListModel todo = todoListRepository.findById(id).orElse(null);
        if (todo == null) return ResponseEntity.notFound().build();
        todo.setCompleted(true);
        todo.setTimeUpdated(new Date());
        todoListRepository.save(todo);
        return ResponseEntity.ok(todo);
    }
}