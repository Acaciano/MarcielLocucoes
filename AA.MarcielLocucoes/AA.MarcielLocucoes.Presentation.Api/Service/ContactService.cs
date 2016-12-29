using System.Collections.Generic;
using System.Configuration;
using AA.MarcielLocucoes.Presentation.Api.Helper;
using AA.MarcielLocucoes.Presentation.Api.Models;

namespace AA.MarcielLocucoes.Presentation.Api.Service
{
    public class ContactService
    {
        public bool Send(ContactModel contactModel, string template)
        {
            if (contactModel != null)
            {
                List<string> emails = new List<string> { ConfigurationManager.AppSettings.Get("email") };

                Email.EmailParameter emailParameterDefault = 
                    Email.CreateEmailParameterDefault(emails, contactModel.email, contactModel.name, template, "Graniso Produções - Entre em Contato");

                return Email.Send(emailParameterDefault);
            }

            return false;
        }
    }
}