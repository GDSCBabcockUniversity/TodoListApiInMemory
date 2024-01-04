
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Entities;

namespace TodoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoListController : ControllerBase
    {
        private readonly TodoDbContext _context;

        public TodoListController(TodoDbContext context)
        {
            _context = context;
        }


        [HttpGet("Todos")]

        public async Task<IActionResult> GetAllTodos()
        {
            var todos = await _context.TodoList.ToListAsync();

            if (!todos.Any())
                return NotFound();
            return Ok(todos);
        }

        [HttpPost("AddTodo")]
        public async Task<IActionResult> AddTodo( string Title , string Description)
        {
            var todo = new TodoListModel();
            todo.Title = Title;
            todo.Description = Description;
            todo.TimeCreated = DateTime.Now;
            todo.TimeUpdated = DateTime.Now;
            todo.IsCompleted = false;
            await _context.TodoList.AddAsync(todo);
            await _context.SaveChangesAsync();
            return Ok(todo);

        }

        [HttpGet("Todo/{id}")]
        public async Task<IActionResult> GetSingleTodo(int id)
        {
            var todo = await _context.TodoList.FirstOrDefaultAsync(x => x.Id == id);
            if (todo is null)
                return NotFound();
            return Ok(todo);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> EditTodo (int id, string Title , string Description)
        {
            var todo = await _context.TodoList.FirstOrDefaultAsync(x => x.Id == id);
            if (todo is null)
                return NotFound();
            todo.Title = Title;
            todo.Description = Description;
            todo.TimeUpdated = DateTimeOffset.UtcNow;
            await _context.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpDelete("DeleteTodo/{id}")]
        public async Task<IActionResult> DeleteTodo (int id)
        {
            var todo = await _context.TodoList.FirstOrDefaultAsync(x => x.Id == id);
            if (todo is null)
                return NotFound();
            _context.TodoList.Remove(todo);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAll()
        {
            var todos = await _context.TodoList.ToListAsync();
            if(todos is null)
                return BadRequest();
            _context.RemoveRange(todos);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPatch("MarkCompletion/{id}")]
        public async Task<IActionResult> CompleteTodo (int id)
        {
            var todo = await _context.TodoList.FirstOrDefaultAsync(x => x.Id == id);
            if (todo is null)
                return NotFound();
            todo.IsCompleted = true;
            todo.TimeUpdated = DateTimeOffset.UtcNow;
            await _context.SaveChangesAsync();
            return Ok(todo);
        }

    }
}
