using Microsoft.AspNetCore.Mvc;

namespace HemoAppBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DoacoesController : ControllerBase
{
    private readonly AppDbContext _context;

    public DoacoesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> RegisterDoacao([FromBody] Doacao doacao)
    {
        _context.Doacoes.Add(doacao);
        var usuario = await _context.Usuarios.FindAsync(doacao.UsuarioId);
        
        if (usuario != null)
        {
            usuario.Pontos += 100; // Incremento de pontos após a doação
            await _context.SaveChangesAsync();
        }
        
        await _context.SaveChangesAsync();
        return Ok("Doação registrada com sucesso.");
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetDoacoes(int userId)
    {
        var doacoes = await _context.Doacoes
            .Include(d => d.PontoDoacao)
            .Where(d => d.UsuarioId == userId)
            .ToListAsync();
        return Ok(doacoes);
    }
}
