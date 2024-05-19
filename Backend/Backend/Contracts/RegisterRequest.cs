namespace Backend.Contracts;

public record RegisterRequest(
    string Email,
    string Password,
    string Name,
    DateTime Birthday,
    int Sex);
