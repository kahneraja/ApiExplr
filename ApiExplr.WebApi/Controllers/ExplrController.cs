using ApiExplr.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace ApiExplr.WebApi.Controllers
{
    /// <summary>
    /// Retrieve endpoint data.
    /// </summary>
    [RoutePrefix("api/explr")]
    public class ExplrController : ApiController
    {
        private ApiReflector reflector;

        /// <summary>
        /// 
        /// </summary>
        public ExplrController()
        {
            var path = HttpContext.Current.Server.MapPath("~/App_Data/XmlDocument.xml");
            reflector = new ApiReflector(typeof(ExplrController), typeof(ApiController), path);
        }

        /// <summary>
        /// Get endpoint data.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            var endpoints = reflector.CollectEndpoints();
            return Ok<List<EndpointModel>>(endpoints);
        }

    }
}

