public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<MeuAppDbContext>(options =>
        options.UseMySql(Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 21))));

    services.AddControllers();
}
