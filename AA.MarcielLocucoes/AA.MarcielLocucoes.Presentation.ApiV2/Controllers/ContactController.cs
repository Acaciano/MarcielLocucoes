using System;
using System.Web.Http;
using AA.MarcielLocucoes.Presentation.ApiV2.Common;
using AA.MarcielLocucoes.Presentation.ApiV2.Models;
using AA.MarcielLocucoes.Presentation.ApiV2.Service;

namespace AA.MarcielLocucoes.Presentation.ApiV2.Controllers
{
    [AllowAnonymous]
    public class ContactController : ApiBaseController
    {
        private readonly ContactService _contactService = new ContactService();

        [AllowAnonymous]
        [HttpPost]
        [Route("v1/contact/send")]
        public IHttpActionResult Send([FromBody] ContactModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string html = "<div>Olá, Graniso Produções </div><div>Você recebeu uma mensagem de contato, através do Portal - Graniso Produções.</div><div></div>";
                    html += "</br></br>";
                    html += "<div>Nome: "+model.name+"</div><div>";
                    html += "<div>Telefone: " + model.fone+"</div><div>";
                    html += "<div>E-mail: " + model.email+"</div><div>";
                    html += "<div>Mensagem: " + model.message+"</div><div>";

                    _contactService.Send(model, html);
                    return Ok(new { message = "Mensagem enviado com sucesso.", success = true });
                }

                return Ok(new { message = "Não foi possivel enviar o contato.", success = false });
            }
            catch (Exception exception)
            {
                return Ok(new { message = "Não foi possivel enviar o contato, erro: " + exception.Message, success = false });
            }
        }
    }
}
