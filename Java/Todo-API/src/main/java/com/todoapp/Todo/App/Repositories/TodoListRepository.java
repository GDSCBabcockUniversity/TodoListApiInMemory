package com.todoapp.Todo.App.Repositories;

import com.todoapp.Todo.App.Entities.TodoListModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoListRepository extends JpaRepository<TodoListModel, Integer> {
}
