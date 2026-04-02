using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.Models;

namespace Portfolio.Api.Controllers;

// ── Skills ────────────────────────────────────────────────
[ApiController]
[Route("api/[controller]")]
public class SkillsController(PortfolioDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var skills = await db.Skills
            .OrderBy(s => s.Category)
            .ThenBy(s => s.SortOrder)
            .ToListAsync();

        var grouped = skills
            .GroupBy(s => s.Category)
            .Select(g => new { Category = g.Key, Items = g.Select(s => s.Name) });

        return Ok(grouped);
    }
}

// ── Projects ──────────────────────────────────────────────
[ApiController]
[Route("api/[controller]")]
public class ProjectsController(PortfolioDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var projects = await db.Projects
            .OrderBy(p => p.SortOrder)
            .ToListAsync();
        return Ok(projects);
    }

    [HttpGet("featured")]
    public async Task<IActionResult> Featured()
    {
        var projects = await db.Projects
            .Where(p => p.Featured)
            .OrderBy(p => p.SortOrder)
            .ToListAsync();
        return Ok(projects);
    }
}

// ── Experience ────────────────────────────────────────────
[ApiController]
[Route("api/[controller]")]
public class ExperienceController(PortfolioDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var experience = await db.Experiences
            .OrderBy(e => e.SortOrder)
            .ToListAsync();
        return Ok(experience);
    }
}

// ── Contact ───────────────────────────────────────────────
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ContactController(
    PortfolioDbContext db,
    IHostEnvironment env,
    ILogger<ContactController> log) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ContactRequest? req)
    {
        if (req is null)
            return BadRequest(new { message = "Request body is required (JSON with name, email, message)." });

        if (string.IsNullOrWhiteSpace(req.Name) ||
            string.IsNullOrWhiteSpace(req.Email) ||
            string.IsNullOrWhiteSpace(req.Message))
            return BadRequest(new { message = "All fields are required." });

        var msg = new ContactMessage
        {
            Name    = req.Name.Trim(),
            Email   = req.Email.Trim(),
            Message = req.Message.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        try
        {
            db.ContactMessages.Add(msg);
            await db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            // Log full exception server-side only — never append raw exception text to JSON
            // (characters in messages can break JSON or confuse the Angular HttpClient parser).
            log.LogError(ex, "Failed to save contact message");
            var hint = env.IsDevelopment()
                ? "Could not save to the database. Run Scripts/supabase-schema.sql in Supabase SQL Editor, then retry. See API logs for details."
                : "Unable to save your message right now. Please email me directly.";
            return StatusCode(500, new { message = hint });
        }

        return Ok(new { message = "Message received. I'll get back to you soon!" });
    }
}
