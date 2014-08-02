using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ApiExplorer.WebApi.Models
{
    public class Person
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public Address Address { get; set; }
    }
}
