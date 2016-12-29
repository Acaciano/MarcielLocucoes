using System;

namespace AA.SmartCondoManager.Presentation.Api.Models
{
    public class BasicRequestData
    {
        public string AuthorizationID { get; set; }

        public string CorrelationRequestID { get; private set; }

        public Guid AppId { get; set; }

        public string ParticipantId { get; set; }

        public string CampaignId { get; set; }

        public string CatalogId { get; set; }

        public string UserIP { get; set; }

        public string UserAgent { get; set; }

        public string ServerName { get; set; }

        public string ServerIP { get; set; }

        public long ChannelId { get; set; }

        public BasicRequestData(string correlationRequestID)
        {
            this.CorrelationRequestID = correlationRequestID;
        }
    }
}