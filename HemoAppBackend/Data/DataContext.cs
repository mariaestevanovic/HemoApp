using Microsoft.EntityFrameworkCore;
using HemoAppBackend.Models;

namespace HemoAppBackend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<PontoDoacao> PontosDoacao { get; set; }
        public DbSet<Doacao> Doacoes { get; set; }
    }
}
