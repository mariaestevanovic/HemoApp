using Microsoft.EntityFrameworkCore;
using MeuAppAPI.Models;

namespace MeuAppAPI.Data
{
    public class MeuAppDbContext : DbContext
    {
        public MeuAppDbContext(DbContextOptions<MeuAppDbContext> options) : base(options) { }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
