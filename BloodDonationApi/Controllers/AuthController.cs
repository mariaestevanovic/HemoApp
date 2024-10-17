using Microsoft.AspNetCore.Mvc;
using BloodDonationApi.Data;
using BloodDonationApi.Models;
using System.Linq;

namespace BloodDonationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly BloodDonationContext _context;

        public AuthController(BloodDonationContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] Usuario usuario)
        {
            if (_context.Usuarios.Any(u => u.Email == usuario.Email))
            {
                return Conflict("Usuário já registrado com esse email");
            }

            _context.Usuarios.Add(usuario);
            _context.SaveChanges();

            return Ok("Usuário cadastrado com sucesso");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Usuario loginRequest)
        {
            var usuario = _context.Usuarios
                .FirstOrDefault(u => u.Email == loginRequest.Email && u.Senha == loginRequest.Senha);

            if (usuario == null)
            {
                return Unauthorized("Credenciais inválidas");
            }

            return Ok("Login realizado com sucesso");
        }
    }
}
