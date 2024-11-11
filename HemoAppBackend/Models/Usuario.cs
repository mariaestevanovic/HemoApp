public class Usuario
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
    public string TipoSanguineo { get; set; }
    public int Pontos { get; set; } = 0;
    public List<Doacao> HistoricoDoacoes { get; set; }
}