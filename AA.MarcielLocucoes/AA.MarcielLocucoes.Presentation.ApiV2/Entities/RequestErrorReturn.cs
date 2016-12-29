using System.Collections.Generic;

namespace AA.MarcielLocucoes.Presentation.ApiV2.Entities
{
    public class RequestErrorReturn
    {
        public RequestErrorReturn()
        {
            Errors = new List<RequestError>();
        }

        public List<RequestError> Errors { get; set; }
    }
}