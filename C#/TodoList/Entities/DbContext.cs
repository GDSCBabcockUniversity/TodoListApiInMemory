using Microsoft.EntityFrameworkCore;

namespace TodoList.Entities;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options) { }
    
    public DbSet<TodoListModel> TodoList { get; set; }
}
