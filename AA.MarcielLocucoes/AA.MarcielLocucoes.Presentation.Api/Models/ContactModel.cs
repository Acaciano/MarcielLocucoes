
using System.ComponentModel.DataAnnotations;

namespace AA.MarcielLocucoes.Presentation.Api.Models
{
    public class ContactModel
    {

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        public string name { get; set; }
        [Required(ErrorMessage = "O campo e-mail é obrigatório")]
        [RegularExpression(@"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", ErrorMessage = "Por favor insira o endereço de e-mail correto")]
        public string email { get; set; }
        [Required(ErrorMessage = "O campo telefone é obrigatório")]
        public string fone { get; set; }
        [Required(ErrorMessage = "O campo mensagem é obrigatório")]
        public string message { get; set; }
    }
}