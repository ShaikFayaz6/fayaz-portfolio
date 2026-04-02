using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;

namespace Portfolio.Api.Data;

public class PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : DbContext(options)
{
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Experience> Experiences => Set<Experience>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Skill>().ToTable("skills");
        modelBuilder.Entity<Project>().ToTable("projects")
            .Property(p => p.Technologies).HasColumnType("text[]");
        modelBuilder.Entity<Experience>().ToTable("experience")
            .Property(e => e.Description).HasColumnType("text[]");
        modelBuilder.Entity<ContactMessage>().ToTable("contact_messages");
    }
}
