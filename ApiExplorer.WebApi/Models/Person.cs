using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ApiExplr.WebApi.Models
{
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public Address Address { get; set; }
    }
}
