namespace Backend.Model.Entities;

public class User
{
    public long Id { get; set; }

    public required string Name { get; set; }

    public DateTime Birthday { get; set; }

    public int Sex { get; set; }

    public required string Email { get; set; }

    public required string Password { get; set; }
}
