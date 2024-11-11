using Microsoft.AspNetCore.Mvc;

namespace HemoAppBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsuariosController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsuariosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] Usuario usuario)
    {
        if (await _context.Usuarios.AnyAsync(u => u.Email == usuario.Email))
            return BadRequest("Usuário já existe.");

        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();
        return Ok("Usuário registrado com sucesso.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Usuario usuario)
    {
        var user = await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Email == usuario.Email && u.Senha == usuario.Senha);
        
        if (user == null)
            return Unauthorized("Credenciais inválidas.");

        return Ok(user);
    }
}
