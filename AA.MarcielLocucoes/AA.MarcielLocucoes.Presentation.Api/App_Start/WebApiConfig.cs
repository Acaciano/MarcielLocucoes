using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace AA.MarcielLocucoes.Presentation.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            EnableCorsAttribute defaultPolicyProvider = new EnableCorsAttribute("http://localhost:55962,http://localhost:54445/", "*", "GET, POST, OPTIONS");
            config.EnableCors(defaultPolicyProvider);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
