using System;
using System.Collections.Generic;
using System.Configuration;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using AA.MarcielLocucoes.Presentation.ApiV2.Entities.Factory;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;

namespace AA.MarcielLocucoes.Presentation.ApiV2.Providers
{
    public class SmartCondoManagerOAuthServerProvider : OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            string clientId;
            string clientSecret;
            StringBuilder stringBuilder = new StringBuilder();

            string grantType = null;
            string password = null;
            string accessCode = null;


            if (context.TryGetBasicCredentials(out clientId, out clientSecret) ||
                context.TryGetFormCredentials(out clientId, out clientSecret))
            {
                grantType = context.Parameters["grant_type"];
                password = context.Parameters["password"];
                accessCode = context.Parameters["username"];

                try
                {
                    if (!string.IsNullOrEmpty(grantType) && !string.IsNullOrEmpty(accessCode) && !string.IsNullOrEmpty(password))
                    {
                        if (grantType.ToLower() == "password")
                        {

                            if (StartWithoutSession(accessCode, password))
                            {
                                context.OwinContext.Set("idUser", Guid.NewGuid().ToString());
                                context.Validated();
                            }
                            else
                            {
                                context.SetError("invalid_user",
                                    "Não foi encontrado nenhum usuário para o código de acesso / senha informado.");
                            }
                        }
                        else
                        {
                            context.SetError("invalid_request", "grant_type invalid.");
                        }
                    }
                    else
                    {
                        context.SetError("invalid_request", "Código de acesso / Senha inválido");
                    }
                }
                catch (Exception exception)
                {
                    context.SetError("server_error: " + exception.StackTrace);
                }
            }
            else
            {
                context.SetError("invalid_client", "Client credentials could not be retrieved through the Authorization header.");
            }

            if (string.IsNullOrEmpty(context.ErrorDescription) || stringBuilder.Length <= 0)
                new LogWebApiScmFactory().SaveLog("Validação do cliente.", string.Format("grant_type={0}&codigo={1}&username={2} | clientId: {3} | clientSecret: {4}", grantType, password, accessCode, clientId, clientSecret), "Executando o método de validação", "Validação efetuada com sucesso.", HttpContext.Current);
            else
                new LogWebApiScmFactory().SaveLog("Validação do cliente.", string.Format("grant_type={0}&codigo={1}&username={2} | clientId: {3} | clientSecret: {4}", grantType, password, accessCode, clientId, clientSecret), "Executando o método de validação", string.Format("Error: {0} | {1}", context.ErrorDescription, stringBuilder), HttpContext.Current);

            return Task.FromResult(0);
        }

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            ClaimsIdentity oAuthIdentity = new ClaimsIdentity(context.Options.AuthenticationType);
            oAuthIdentity.AddClaim(new Claim(ClaimTypes.UserData, Guid.NewGuid().ToString()));
            oAuthIdentity.AddClaim(new Claim(ClaimTypes.Name, Guid.NewGuid().ToString()));
            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, new AuthenticationProperties());
            context.Validated(ticket);

            return base.GrantResourceOwnerCredentials(context);
        }

        public override Task GrantClientCredentials(OAuthGrantClientCredentialsContext context)
        {
            ClaimsIdentity identity = new ClaimsIdentity(new GenericIdentity(context.OwinContext.Get<string>("idUser"), OAuthDefaults.AuthenticationType));
            context.Validated(new AuthenticationTicket(identity, null));

            var fromResult = Task.FromResult(0);

            return fromResult;
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            var fromResult = Task.FromResult<object>(null);

            return fromResult;
        }

        private bool StartWithoutSession(string user, string password)
        {
            if (!string.IsNullOrEmpty(user) && !string.IsNullOrEmpty(password))
            {
               return true;
            }

            return false;
        }
    }
}