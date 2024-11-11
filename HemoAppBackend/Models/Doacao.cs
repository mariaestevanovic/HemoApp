public class Doacao
{
    public int Id { get; set; }
    public DateTime Data { get; set; }
    public int UsuarioId { get; set; }
    public Usuario Usuario { get; set; }
    public int PontoDoacaoId { get; set; }
    public PontoDoacao PontoDoacao { get; set; }
}