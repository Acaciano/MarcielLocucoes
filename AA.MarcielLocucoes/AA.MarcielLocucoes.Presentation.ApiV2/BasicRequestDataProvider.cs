using System;
using System.Security.Claims;
using System.Web;
using AA.SmartCondoManager.Presentation.Api.Models;

namespace AA.SmartCondoManager.Presentation.Api
{
    public static class BasicRequestDataProvider
    {
        public static BasicRequestData GetBasicRequestData()
        {
            var context = HttpContext.Current.GetOwinContext();
            var authorization = context.Request.Headers["Authorization"];

            if (!String.IsNullOrEmpty(authorization) && authorization.StartsWith("Bearer"))
            {
                //Get claims from authorization header
                var token = authorization.Replace("Bearer ", String.Empty);
                var ticket = Startup.OAuthBearerOptions.AccessTokenFormat.Unprotect(token);

                if (ticket != null)
                {
                    var claims = ticket.Identity;
                    var correlationId = context.Request.Get<string>("owin.RequestId");

                    if (claims != null)
                    {
                        //Get claims
                        var identifier = claims.FindFirst(ClaimTypes.NameIdentifier);
                        var appId = claims.FindFirst(MarketplaceClaimTypes.AppId);
                        var participantId = claims.FindFirst(MarketplaceClaimTypes.ParticipantId);
                        var campaignId = claims.FindFirst(MarketplaceClaimTypes.CampaignId);
                        var catalogId = claims.FindFirst(MarketplaceClaimTypes.CatalogId);
                        var authorizationId = claims.FindFirst(MarketplaceClaimTypes.AuthorizationId);

                        Guid appIdValue;
                        String campaignIdValue;

                        //Validate app id
                        if (appId == null || !Guid.TryParse(appId.Value, out appIdValue))
                            throw new InvalidOperationException("app_id not provided");

                        //Validate campaign id
                        if (campaignId != null)
                            campaignIdValue = campaignId.Value;
                        else
                            throw new InvalidOperationException("campaign_id not provided");

                        //Create basic request data
                        return new BasicRequestData(correlationId)
                        {
                            AppId = appIdValue,
                            ParticipantId = participantId == null ? null : participantId.Value,
                            CampaignId = campaignIdValue,
                            CatalogId = catalogId == null ? null : catalogId.Value,
                            ServerIP = context.Request.LocalIpAddress,
                            ServerName = context.Request.Host.Value,
                            UserIP = context.Request.RemoteIpAddress,
                            UserAgent = context.Request.Headers["User-Agent"],
                            AuthorizationID = authorizationId == null ? null : authorizationId.Value
                        };
                    }
                }
            }
            return null;
        }
    }
}