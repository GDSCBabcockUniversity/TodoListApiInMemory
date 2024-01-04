namespace TodoList.Entities;

public class TodoListModel
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTimeOffset TimeCreated { get; set; }
    public DateTimeOffset TimeUpdated { get; set; }
    public bool IsCompleted { get; set; }
}
