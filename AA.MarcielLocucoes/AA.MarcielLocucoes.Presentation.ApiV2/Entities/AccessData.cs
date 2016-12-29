using System.ComponentModel.DataAnnotations;

namespace AA.MarcielLocucoes.Presentation.ApiV2.Entities
{
    public class AccessData
    {
        [Key]
        [MaxLength(32)]
        public string ClientId { get; set; }

        [MaxLength(80)]
        [Required]
        public string Base64Secret { get; set; }
    }
}