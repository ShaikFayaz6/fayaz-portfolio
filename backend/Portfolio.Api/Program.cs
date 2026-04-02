using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Render (and similar hosts) set PORT; Kestrel must listen on it.
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// ── Services ──────────────────────────────────────────────
builder.Services.AddDbContext<PortfolioDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("Supabase")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Fayaz Shaik Portfolio API", Version = "v1" });
});

builder.Services.AddCors(opt =>
    opt.AddDefaultPolicy(policy =>
        policy.WithOrigins(
                builder.Configuration["AllowedOrigins"]?.Split(',') ?? ["http://localhost:4200"])
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();
var env = app.Environment;

// ── Middleware ─────────────────────────────────────────────
// Always return JSON for unhandled API exceptions (never HTML/plain text — breaks Angular).
app.UseExceptionHandler(exceptionApp =>
{
    exceptionApp.Run(async context =>
    {
        var ex = context.Features.Get<IExceptionHandlerFeature>()?.Error;

        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json; charset=utf-8";

        var payload = new Dictionary<string, object?>
        {
            ["message"] =
                "An unexpected server error occurred. Check the API console logs. If the database is new, run Scripts/supabase-schema.sql in Supabase SQL Editor."
        };
        if (env.IsDevelopment() && ex != null)
            payload["detail"] = $"{ex.GetType().Name}: {ex.Message}";

        var json = JsonSerializer.Serialize(payload);
        await context.Response.WriteAsync(json, Encoding.UTF8);
    });
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
// Local dev often uses http://localhost:5000 only; HTTPS redirect can break POST / confuse clients.
if (!env.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();
