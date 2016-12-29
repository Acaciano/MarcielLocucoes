using System;

namespace AA.MarcielLocucoes.Presentation.ApiV2.Entities
{
    public class ResultData
    {
        public bool Success;
        public string MessageResult;

        public static ResultData Error(Exception exception)
        {
            return new ResultData
            {
                Success = false,
                MessageResult = "Erro: " + exception.Message
            };
        }

        public static ResultData Error(string message)
        {
            return new ResultData
            {
                Success = false,
                MessageResult = "Erro: " + message
            };
        }
    }

    public class ResultData<T> : ResultData
    {
        public T Result;
    }

    public class ResultDataError<T> : ResultData
    {
        public T Result;

        public static ResultDataError<T> Error(T result)
        {
           return new ResultDataError<T>
            {
                Success = false,
                MessageResult = "Ocorreu um erro.",
                Result = result
           };
        }
    }

    public class ResultDataSuccess<T> : ResultData
    {
        public T Result;

        public static ResultData<T> Ok(T result , string message = null)
        {
            return new ResultData<T>
            {
                Success = true,
                MessageResult = message ?? "Operação executada com sucesso.",
                Result = result
            };
        }
    }
}