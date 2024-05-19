using Backend.Model.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

string connectionString = builder.Configuration.GetConnectionString("Lab3")!;
builder.Services.AddDbContext<Context>(options => options.UseNpgsql(connectionString));

var app = builder.Build();

using IServiceScope serviceScope = app.Services.CreateScope();

using Context dbContext = serviceScope.ServiceProvider.GetRequiredService<Context>();

dbContext.Database.Migrate();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(config => { 
    config.AllowAnyHeader();
    config.AllowAnyMethod();
    config.AllowAnyOrigin();
});
app.UseRouting();
app.UseEndpoints(endpoints => endpoints.MapControllers());
app.Run();
