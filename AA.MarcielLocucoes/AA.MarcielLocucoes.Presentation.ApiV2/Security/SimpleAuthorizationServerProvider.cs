using System;
using System.Collections.Generic;
using System.Configuration;
using System.Security.Claims;
using System.Threading.Tasks;
using AA.SmartCondoManager.Domain.Entities;
using AA.SmartCondoManager.Presentation.Api.Models;
using GrupoLTM.MarketPlace.Mock.Api;
using GrupoLTM.MarketPlace.Mock.Api.Models;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Security.Provider;

namespace AA.SmartCondoManager.Presentation.Api.Security
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider

    {
        private string campaignId;
        private string vendorId;
        private string escape;
        private IReadableStringCollection parameters;
        private OAuthApp app;
        private OAuthAppDataProvider authService;
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            string clientId = string.Empty;
            string clientSecret = string.Empty;
            campaignId = context.Parameters.Get("campaign_id");
            vendorId = context.Parameters.Get("vendor_id");
            escape = context.Parameters.Get("escape");

            parameters = context.Parameters;

            Guid appId;
            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
            {
                context.TryGetFormCredentials(out clientId, out clientSecret);
            }

            if (context.ClientId == null || !Guid.TryParse(clientId, out appId))
            {
                context.SetError("invalid_client", "Client credentials could not be retrieved through the Authorization header.");
                context.Rejected();

                return;
            }
            try
            {
                authService = new OAuthAppDataProvider();
                app = authService.FindApp();
                if (appId == app.AppId && clientSecret == app.AppSecretHash)
                {

                    context.OwinContext.Set("oauth:client", app);
                    context.Validated(clientId);
                }
                else
                {
                    // Client could not be validated.
                    context.SetError("invalid_client", "Client credentials are invalid.");
                    context.Rejected();
                }
            }
            catch (Exception ex)
            {
                string errorMessage = ex.Message;
                context.SetError("server_error");
                context.Rejected();
            }

            return;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var campaignId = parameters.Get(MarketplaceClaimTypes.CampaignId);
           // context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            var authorizationTrackId = GenerateAuthorizationTrackId();

            var usuario = new Usuario();

            if (usuario == null)
            {
                context.Rejected();
                context.SetError("participant not found!");
                return;
            }
            else
            {

                var identity = GetClaims(context, authorizationTrackId, usuario);
                var ticket = new AuthenticationTicket(identity, GetAppProperties(authorizationTrackId, app, usuario));

                SetExpireTime(context.Options);

                context.Validated(ticket);
            }
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }
            return Task.FromResult<object>(null);
        }

        public string GenerateAuthorizationTrackId()
        {
            return Guid.NewGuid().ToString("N");
        }

        private ClaimsIdentity GetBasicClaims(BaseContext<OAuthAuthorizationServerOptions> context
            , string authorizationTrackId)
        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim(MarketplaceClaimTypes.AppId, app.AppId.ToString("N")));
            identity.AddClaim(new Claim(MarketplaceClaimTypes.CampaignId, campaignId));
            identity.AddClaim(new Claim(MarketplaceClaimTypes.AuthorizationId, authorizationTrackId));
            if (vendorId != null) identity.AddClaim(new Claim(MarketplaceClaimTypes.VendorId, vendorId));
            return identity;
        }

        public ClaimsIdentity GetClaims(OAuthGrantResourceOwnerCredentialsContext context
            , string authorizationTrackId, Usuario participant)
        {
            var identity = GetBasicClaims(context, authorizationTrackId);

            //Defaults Claims
            identity.AddClaim(new Claim(ClaimTypes.Name, string.IsNullOrEmpty(participant.Nome) ? "" : participant.Nome));
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, participant.Id.ToString()));

            //Participant Claims
            identity.AddClaim(new Claim(MarketplaceClaimTypes.ParticipantId, participant.Id.ToString()));
            //identity.AddClaim(new Claim(MarketplaceClaimTypes.ProfileId, participant.Nivel.ToString()));
            //identity.AddClaim(new Claim(MarketplaceClaimTypes.CatalogId, participant.Nivel.ToString()));

            //Type
            identity.AddClaim(new Claim(MarketplaceClaimTypes.GrantType, "password"));


            foreach (var scope in app.Scopes)
                identity.AddClaim(new Claim(ClaimTypes.Role, scope));

            return identity;
        }
        public void SetExpireTime(OAuthAuthorizationServerOptions options)
        {              
            options.AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(double.Parse(ConfigurationManager.AppSettings["OAuth.TokenExpirationMinutes"]));
        }
        public AuthenticationProperties GetAppProperties(string authorizationTrackId, OAuthApp app, Usuario participante)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                {MarketplaceClaimTypes.AuthorizationId, authorizationTrackId },
                {MarketplaceClaimTypes.Name, EscapeDataString(string.IsNullOrEmpty(participante.Nome) ? "" : participante.Nome) },
                //{MarketplaceClaimTypes.CatalogId, participante.Nivel.ToString() },
                {MarketplaceClaimTypes.ProfileId, participante.Id.ToString() },
                { MarketplaceClaimTypes.Scopes, String.Join(",", app.Scopes) },
                {MarketplaceClaimTypes.CampaignId, campaignId }
            };
            return new AuthenticationProperties(data);
        }

        private string EscapeDataString(string data)
        {
            if (!String.IsNullOrWhiteSpace(escape) && escape.ToLower() == "no") return data;
            return Uri.EscapeDataString(data);
        }
    }

}