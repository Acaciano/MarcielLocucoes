using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace AA.MarcielLocucoes.Presentation.Api.Helper
{
    public static class Email
    {
        public class EmailParameter
        {
            public List<string> Emails { get; set; }
            public List<string> Attachments { get; set; }
            public string MailFrom { get; set; }
            public string NameFrom { get; set; }
            public string Body { get; set; }
            public string Title { get; set; }
        }

        public static bool Send(EmailParameter parameter)
        {
            try
            {
                string strSmtp = ConfigurationManager.AppSettings.Get("Smtp");
                string loginSmtp = ConfigurationManager.AppSettings.Get("LoginSmtp");
                string passwordSmtp = ConfigurationManager.AppSettings.Get("PasswordSmtp");
                string portSmtp = ConfigurationManager.AppSettings.Get("PortSmtp");
                
                MailMessage mailMessage = new MailMessage
                {
                    From = new MailAddress(parameter.MailFrom, parameter.NameFrom),
                    Subject = parameter.Title,
                    Body = parameter.Body,
                    IsBodyHtml = true,
                    SubjectEncoding = Encoding.GetEncoding("ISO-8859-1"),
                    BodyEncoding = Encoding.GetEncoding("ISO-8859-1")
                };

                SmtpClient smtp = new SmtpClient
                {
                    Host = strSmtp,
                    EnableSsl = false,
                    Port = Convert.ToInt32(portSmtp),
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(loginSmtp, passwordSmtp)
                };

                if (parameter.Emails == null)
                    throw new Exception("Lista de e-mails null.");

                if (!parameter.Emails.Any())
                    throw new Exception("Lista de e-mails vazio.");

                if (parameter.Attachments != null)
                {
                    foreach (var strCaminhoAnexo in parameter.Attachments)
                        mailMessage.Attachments.Add(new Attachment(strCaminhoAnexo, System.Net.Mime.MediaTypeNames.Application.Octet));
                }

                foreach (var email in parameter.Emails)
                    mailMessage.To.Add(email);

                ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

                smtp.Send(mailMessage);
                mailMessage.Dispose();

                return true;
            }
            catch (Exception exception)
            {
                return false;
            }
        }

        public static EmailParameter CreateEmailParameterDefault(List<string> emails, string mailFrom, string nameFrom,
                                                                 string body, string title, List<string> attachments = null)
        {
            EmailParameter emailParameter = new EmailParameter
            {
                Emails = emails,
                Attachments = attachments,
                MailFrom = mailFrom,
                NameFrom = nameFrom,
                Body = body,
                Title = title
            };

            return emailParameter;
        }
    }
}