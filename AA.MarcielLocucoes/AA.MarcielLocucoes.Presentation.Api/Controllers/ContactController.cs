using System;
using System.IO;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using AA.MarcielLocucoes.Presentation.Api.Models;
using AA.MarcielLocucoes.Presentation.Api.Service;

namespace AA.MarcielLocucoes.Presentation.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ContactController : ApiController
    {
        private readonly ContactService _contactService = new ContactService();

        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        //[System.Web.Http.AllowAnonymous]
        //[System.Web.Http.HttpPost]
        //public JsonResult Send(ContactModel model)
        //{
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            //string template = RenderPartialToString(ControllerContext, "~/Views/Contact/Index.cshtml", model, true);
        //            _contactService.Send(model, "sdfsdfsdf");
        //            return Json(new { message = "Mensagem enviado com sucesso.", success = true });
        //        }

        //        return Json(new { message = "Não foi possivel enviar o contato.", success = false });
        //    }
        //    catch (Exception exception)
        //    {
        //        return Json(new { message = "Não foi possivel enviar o contato, erro: " + exception.Message, success = false });
        //    }
        //}

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("v1/contact/send")]
        public IHttpActionResult Send([FromBody] ContactModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //string template = RenderPartialToString(ControllerContext, "~/Views/Contact/Index.cshtml", model, true);
                    _contactService.Send(model, "sdfsdfsdf");
                    return Json(new { message = "Mensagem enviado com sucesso.", success = true });
                }

                return Json(new { message = "Não foi possivel enviar o contato.", success = false });
            }
            catch (Exception exception)
            {
                return Json(new { message = "Não foi possivel enviar o contato, erro: " + exception.Message, success = false });
            }
        }

        public string RenderPartialToString(ControllerContext context, string viewPath, object model = null, bool partial = false)
        {
            if (context == null) throw new ArgumentNullException("context");
            // first find the ViewEngine for this view
            ViewEngineResult viewEngineResult;
            if (partial)
                viewEngineResult = ViewEngines.Engines.FindPartialView(context, viewPath);
            else
                viewEngineResult = ViewEngines.Engines.FindView(context, viewPath, null);

            if (viewEngineResult == null)
                throw new FileNotFoundException("View cannot be found.");

            // get the view and attach the model to view data
            var view = viewEngineResult.View;
            context.Controller.ViewData.Model = model;

            string result;

            using (var sw = new StringWriter())
            {
                var ctx = new ViewContext(context, view,
                                            context.Controller.ViewData,
                                            context.Controller.TempData,
                                            sw);
                view.Render(ctx, sw);
                result = sw.ToString();
            }

            return result;
        }
    }
}
