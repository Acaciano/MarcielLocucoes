using System;
using System.Configuration;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Cors;
using AA.MarcielLocucoes.Presentation.ApiV2;
using AA.MarcielLocucoes.Presentation.ApiV2.ExceptionHelper;
using AA.MarcielLocucoes.Presentation.ApiV2.Providers;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Ninject;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace AA.MarcielLocucoes.Presentation.ApiV2
{
    public class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();

            config.Services.Replace(typeof(IHttpActionInvoker), new ExceptionHandlingControllerActionInvoker());

            WebApiRegister(config);

            app.UseCors(CorsOptions.AllowAll);
            ConfigureOAuth(app);
            app.UseWebApi(config);
        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions();

            OAuthAuthorizationServerOptions oAuthServerOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/token"),
                AllowInsecureHttp = Convert.ToBoolean(ConfigurationManager.AppSettings.Get("AllowInsecureHttp")),
                ApplicationCanDisplayErrors = true,
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(Convert.ToInt32(ConfigurationManager.AppSettings.Get("FromMinutesApi"))),
                Provider = new SmartCondoManagerOAuthServerProvider()
            };

            app.UseOAuthAuthorizationServer(oAuthServerOptions);
            app.UseOAuthBearerAuthentication(OAuthBearerOptions);
        }

        public static void WebApiRegister(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "v1/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
                );

            EnableCorsAttribute defaultPolicyProvider = new EnableCorsAttribute(System.Configuration.ConfigurationManager.AppSettings.Get("HostAPI"), "*", "GET, POST, OPTIONS");
            config.EnableCors(defaultPolicyProvider);

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
        }
    }
}
