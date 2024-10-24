using Microsoft.EntityFrameworkCore;
using BloodDonationApi.Models;

namespace BloodDonationApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
    }
}
