using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using AA.MarcielLocucoes.Presentation.ApiV2.Entities;

namespace AA.MarcielLocucoes.Presentation.ApiV2.ExceptionHelper
{
    public class ExceptionHandlingControllerActionInvoker : ApiControllerActionInvoker
    {
        public override Task<HttpResponseMessage> InvokeActionAsync(HttpActionContext actionContext, System.Threading.CancellationToken cancellationToken)
        {
            var result = base.InvokeActionAsync(actionContext, cancellationToken);

            if (result.Exception != null && result.Exception.GetBaseException() != null)
            {
                var baseException = result.Exception.GetBaseException();
                var returnObject = new RequestErrorReturn();

                if (baseException is BusinessException)
                {
                    BusinessException businessException = baseException as BusinessException;

                    returnObject.Errors.Add(new RequestError
                    {
                        CodeResult = businessException.ErrorCode,
                        MessageError = businessException.Message,
                        MessageResult = businessException.Message
                    });
                }
                else
                {
                    returnObject.Errors.Add(new RequestError
                    {
                        CodeResult = 400,
                        MessageError = baseException.Message,
                        MessageResult = "Ocorreu um erro ao acessar API."
                    });

                }

                return Task.Run(() => new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new ObjectContent<RequestErrorReturn>(returnObject, new JsonMediaTypeFormatter()),
                    ReasonPhrase = "Request Error"
                }, cancellationToken);
            }

            return result;
        }
    }
}