using System.Collections.Generic;
using System.Linq;
using System.Web.Http.ModelBinding;

namespace AA.MarcielLocucoes.Presentation.ApiV2.Helper
{
    public class ModelStateHelper
    {
        public static string GetErros(ModelStateDictionary modelState, string delimit = "</br>")
        {
            var errors = "";
            int count = modelState.Values.Count;
            int i = 1;

            foreach (var state in modelState.Values)
            {
                foreach (var error in state.Errors.Where(error => !string.IsNullOrWhiteSpace(error.ErrorMessage)))
                {
                    if (count == 1)
                        errors += error.ErrorMessage;
                    else
                        errors += count == i ? error.ErrorMessage : error.ErrorMessage + delimit;
                }

                i++;
            }

            return errors;
        }

        public static List<string> GetErros(ModelStateDictionary modelState)
        {
            List<string> errors = new List<string>();

            foreach (var state in modelState.Values)
            {
                errors.AddRange(state.Errors.Where(error => !string.IsNullOrWhiteSpace(error.ErrorMessage)).Select(error => error.ErrorMessage));
            }

            return errors;
        }
    }
}
