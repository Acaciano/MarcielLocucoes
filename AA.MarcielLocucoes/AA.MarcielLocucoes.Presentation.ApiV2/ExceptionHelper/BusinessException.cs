using System;
using System.Runtime.Serialization;

namespace AA.MarcielLocucoes.Presentation.ApiV2.ExceptionHelper
{
    [Serializable]
    public class BusinessException : System.Exception
    {
        public BusinessException(string message, int errorCode)
            : base(message)
        {
            this.ErrorCode = errorCode;
        }

        public BusinessException(string message, System.Exception innerException, int errorCode)
            : base(message, innerException)
        {
            this.ErrorCode = errorCode;
        }

        public int ErrorCode { get; set; }

        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            base.GetObjectData(info, context);

            info.AddValue("ErrorCode", this.ErrorCode);
        }
    }
}