using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http.Filters;
using AA.MarcielLocucoes.Presentation.ApiV2.Entities;
using Newtonsoft.Json;

namespace AA.MarcielLocucoes.Presentation.ApiV2.Filter
{
    public class LogFilter : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            try
            {
                if (actionExecutedContext.Exception != null)
                    return;

                var actionContext = actionExecutedContext.ActionContext;

                var arguments = new StringBuilder();
                foreach (var argument in actionContext.ActionArguments)
                {
                    arguments.Append(argument.Key);
                    arguments.Append(":");
                    arguments.Append(JsonConvert.SerializeObject(argument.Value));
                    arguments.Append(";");
                }

                var content = (ObjectContent)actionExecutedContext.Response.Content;
                var objetoRetorno = content.Value as ResultData;

                var metodo = actionContext.ActionDescriptor.ControllerDescriptor + "/" + actionContext.ActionDescriptor.ActionName;
                var objeto = arguments.ToString();
                var acao = string.Format("Executando o método {0}", actionContext.ActionDescriptor.ActionName);
                var mensagem = "";

                if (objetoRetorno != null)
                {
                    mensagem = string.Format("Código de retorno: {0} | Mensagem de retorno: {1}", objetoRetorno.Success, objetoRetorno.MessageResult);
                }

                var type = content.Value.GetType();
                var field = type.GetField("Result");
                if (field != null)
                {
                    var objetoResultado = field.GetValue(content.Value);

                    objeto += " | " + JsonConvert.SerializeObject(objetoResultado);
                }

               // LogService.LogAcaoApi(acao, metodo, "API", objeto, mensagem, HttpContext.Current);
            }
            catch
            {
            }
        }
    }
}