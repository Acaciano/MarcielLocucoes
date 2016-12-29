using GrupoLTM.MarketPlace.Mock.Api.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace GrupoLTM.MarketPlace.Mock.Api
{
    public class OAuthAppDataProvider
    {
        public OAuthApp FindApp()
        {
            return new OAuthApp
            {
                AppId = Guid.Parse(ConfigurationManager.AppSettings["AppId"]),
                AppSecretHash= ConfigurationManager.AppSettings["AppSecretHash"],
                AppName= ConfigurationManager.AppSettings["AppName"],
                AppWebsite= ConfigurationManager.AppSettings["AppWebsite"],
                RedirectURI= ConfigurationManager.AppSettings["RedirectURI"],
                Email= ConfigurationManager.AppSettings["Email"],
                Locked= Boolean.Parse(ConfigurationManager.AppSettings["Locked"]),
                IsMultiCampaign= Boolean.Parse(ConfigurationManager.AppSettings["IsMultiCampaign"]),
                Scopes= new List<string>(ConfigurationManager.AppSettings["Scopes"].Split(',')),
                Campaigns= new List<string>(ConfigurationManager.AppSettings["Campaigns"].Split(',')),
                CreationDate= new DateTime(),
                LastModified= new DateTime()
            };
        }
    }
}