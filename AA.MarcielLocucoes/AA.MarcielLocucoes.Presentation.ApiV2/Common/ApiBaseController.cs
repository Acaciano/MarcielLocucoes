using System;
using System.IO;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using System.Web.UI;

namespace AA.MarcielLocucoes.Presentation.ApiV2.Common
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [System.Web.Http.Authorize()]
    public class ApiBaseController : ApiController
    {
        protected Claim GetClaims(object claimType)
        {
            try
            {
                ClaimsIdentity claimsIdentity = (ClaimsIdentity)RequestContext.Principal.Identity;
                Claim claim = claimsIdentity.FindFirst((string) claimType);

                return claim;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
