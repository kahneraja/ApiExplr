using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ApiExplorer.AuthApi.Models
{
    public class TokenResponse
    {
        public string access_token { get; set; }
        public int expires_in { get; set; }
    }
}
