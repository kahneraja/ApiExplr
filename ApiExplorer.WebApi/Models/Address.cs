using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ApiExplorer.WebApi.Models
{
    public class Address
    {
        public int StreetNumber { get; set; }
        public string StreetName { get; set; }
        public string Suburb { get; set; }
        public int Postcode { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }
}
