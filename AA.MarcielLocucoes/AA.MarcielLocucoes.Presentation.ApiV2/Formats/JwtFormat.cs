using System;
using System.Configuration;
using System.IdentityModel.Tokens;
using System.Web;
using AA.MarcielLocucoes.Presentation.ApiV2.Entities;
using AA.MarcielLocucoes.Presentation.ApiV2.Entities.Factory;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Newtonsoft.Json;
using Thinktecture.IdentityModel.Tokens;

namespace AA.MarcielLocucoes.Presentation.ApiV2.Formats
{
    public class JwtFormat : ISecureDataFormat<AuthenticationTicket>
    {
        private readonly string _issuer;

        public JwtFormat(string issuer)
        {
            _issuer = issuer;
        }

        public string Protect(AuthenticationTicket data)
        {
            if (data == null)
                throw new ArgumentNullException("data");

            string clientId = ConfigurationManager.AppSettings.Get("ClientIdApi");

            if (string.IsNullOrWhiteSpace(clientId)) 
                throw new InvalidOperationException("AuthenticationTicket.Properties does not include AccessData");

            AccessData accessData = new AccessDataFactory().Get();
            string symmetricKeyAsBase64 = accessData.Base64Secret;

            byte[] keyByteArray = TextEncodings.Base64Url.Decode(symmetricKeyAsBase64);

            HmacSigningCredentials signingKey = new HmacSigningCredentials(keyByteArray);

            DateTimeOffset? issued = data.Properties.IssuedUtc;
            DateTimeOffset? expires = data.Properties.ExpiresUtc;

            JwtSecurityToken token = new JwtSecurityToken(_issuer, clientId, data.Identity.Claims, issued.Value.UtcDateTime, expires.Value.UtcDateTime, signingKey);

            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

            string jwt = handler.WriteToken(token);

            new LogWebApiScmFactory().SaveLog("Token", JsonConvert.SerializeObject(token), "Gerando token", string.Format("Token gerado: {0}", jwt), HttpContext.Current);

            return jwt;
        }

        public AuthenticationTicket Unprotect(string protectedText)
        {
            throw new NotImplementedException();
        }
    }
}