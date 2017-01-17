using System.Collections.Generic;
using System.Configuration;
using AA.MarcielLocucoes.Presentation.ApiV2.Helper;
using AA.MarcielLocucoes.Presentation.ApiV2.Models;

namespace AA.MarcielLocucoes.Presentation.ApiV2.Service
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