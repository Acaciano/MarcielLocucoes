using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GrupoLTM.MarketPlace.Mock.Api.Models
{
    public class OAuthApp
    {
        public Guid AppId { get; set; }

        public string AppSecretHash { get; set; }

        public string AppName { get; set; }

        public string AppWebsite { get; set; }

        public string RedirectURI { get; set; }

        public string Email { get; set; }

        public bool Locked { get; set; }

        public bool IsMultiCampaign { get; set; }

        public List<string> Scopes { get; set; }

        public List<string> Campaigns { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime LastModified { get; set; }

        public bool IsSuperApp
        {
            get
            {
                return this.IsMultiCampaign && this.Campaigns.Count == 0;
            }
        }

        public string FirstCampaign
        {
            get
            {
                return Enumerable.FirstOrDefault<string>((IEnumerable<string>)this.Campaigns);
            }
        }

        public OAuthApp()
        {
            this.Scopes = new List<string>();
            this.Campaigns = new List<string>();
        }

        public bool HasScope(string scope)
        {
            return this.Scopes.Contains(scope);
        }

        public bool HasCampaign(string campaignId)
        {
            if (this.IsSuperApp)
                return true;
            return this.Campaigns.Contains(campaignId);
        }
    }
}