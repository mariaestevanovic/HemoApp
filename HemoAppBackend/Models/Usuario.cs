namespace HemoAppBackend.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Localizacao { get; set; }
        public string TipoSanguineo { get; set; }
        public DateTime DataNascimento { get; set; }
        public decimal Peso { get; set; }
        public string Bio { get; set; }
        public string RG { get; set; }
        public string CPF { get; set; }
        public DateTime CriadoEm { get; set; }
        public DateTime AtualizadoEm { get; set; }
    }
}
