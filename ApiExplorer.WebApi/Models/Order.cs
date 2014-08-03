using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ApiExplr.WebApi.Models
{
    public class Order
    {
        public List<Product> Products { get; set; }
        public Decimal TotalPrice { get; set; }
    }
}
