using Microsoft.AspNetCore.Mvc;

namespace HemoAppBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PontosDoacaoController : ControllerBase
{
    private readonly AppDbContext _context;

    public PontosDoacaoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetPontosDoacao()
    {
        var pontos = await _context.PontosDoacao.ToListAsync();
        return Ok(pontos);
    }

    [HttpPost]
    public async Task<IActionResult> AddPontoDoacao([FromBody] PontoDoacao pontoDoacao)
    {
        _context.PontosDoacao.Add(pontoDoacao);
        await _context.SaveChangesAsync();
        return Ok("Ponto de Doação adicionado com sucesso.");
    }
}
