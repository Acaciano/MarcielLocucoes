using System.Threading.Tasks;
using System.Web;

namespace AA.MarcielLocucoes.Presentation.ApiV2.Entities.Factory
{
    public class LogWebApiScmFactory
    {
        public void SaveLog(string metodo, string objeto, string acao , string descricao , HttpContext httpContext)
        {
            //LogService.LogAcaoApi(acao, metodo, "API", objeto, descricao,httpContext);
        }

        public void SaveLogAsync(string metodo, string objeto, string acao, string descricao , HttpContext httpContext)
        {
            Task.Run(() => SaveLog(metodo,objeto,acao,descricao,httpContext));
        }
    }
}