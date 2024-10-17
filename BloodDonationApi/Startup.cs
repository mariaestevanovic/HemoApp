public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<BloodDonationContext>(options =>
        options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

    services.AddControllers();
}
