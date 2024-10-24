using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MeuAppAPI.Data;
using MeuAppAPI.Models;

namespace MeuAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly MeuAppDbContext _context;

        public UsuariosController(MeuAppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(Usuario usuario)
        {
            var existingUser = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == usuario.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "Conta já existente" });
            }

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Cadastro realizado com sucesso" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string email, string senha)
        {
            var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email && u.Senha == senha);
            if (user == null)
            {
                return Unauthorized(new { message = "Credenciais inválidas" });
            }

            return Ok(new { message = "Login realizado com sucesso" });
        }
    }
}
