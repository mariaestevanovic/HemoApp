using Microsoft.EntityFrameworkCore;
using BloodDonationApi.Models;

namespace BloodDonationApi.Data
{
    public class BloodDonationContext : DbContext
    {
        public BloodDonationContext(DbContextOptions<BloodDonationContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}
