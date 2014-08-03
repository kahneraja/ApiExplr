using ApiExplorer.AuthApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ApiExplorer.AuthApi.Controllers
{
    public class TokenController : ApiController
    {
        // GET api/values
        [HttpPost]
        public TokenResponse Index()
        {
            return new TokenResponse { 
                access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.eoaDVGTClRdfxUZXiPs3f8FmJDkDE_VCQFXqKxpLsts", 
                expires_in = 3600 
            };
        }
    }
}
