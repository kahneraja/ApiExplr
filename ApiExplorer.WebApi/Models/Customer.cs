using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiExplorer.WebApi.Models
{
    public class Customer : Person
    {

        public List<Order> Orders { get; set; }

    }
}