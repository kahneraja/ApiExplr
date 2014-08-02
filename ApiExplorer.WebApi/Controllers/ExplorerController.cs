using ApiExplorer.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ApiExplorer.WebApi.Controllers
{
    /// <summary>
    /// Retrieve endpoint data.
    /// </summary>
    [RoutePrefix("api/explorer")]
    public class ExplorerController : ApiController
    {
        private ApiReflector reflector;

        /// <summary>
        /// 
        /// </summary>
        public ExplorerController()
        {
            var path = HttpContext.Current.Server.MapPath("~/App_Data/XmlDocument.xml");
            reflector = new ApiReflector(typeof(ExplorerController), typeof(ApiController), path);
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

