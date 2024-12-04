namespace HemoAppBackend.Models
{
    public class Doacao
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }  // Relacionamento com Usuario
        public int PontoDoacaoId { get; set; }
        public PontoDoacao PontoDoacao { get; set; }  // Relacionamento com PontoDoacao
        public DateTime DataDoacao { get; set; }
        // Outros campos necessários
    }
}
