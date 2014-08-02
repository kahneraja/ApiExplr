using ApiExplorer.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ApiExplorer.WebApi.Controllers
{
    /// <summary>
    /// Manage customer data.
    /// </summary>
    [RoutePrefix("api/customers")]
    [EnableCors("*", "*", "*")]
    public class CustomersController : BaseApiController
    {
        /// <summary>
        /// Return all customers
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            var customers = CreateMockCustomers();

            return Ok(customers);
        }


        /// <summary>
        /// GET api/values/5
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult Get([FromUri] int id)
        {
            var customer = CreateMockCustomer();
            return Ok(customer);
        }

        /// <summary>
        /// POST api/values
        /// </summary>
        /// <param name="value"></param>
        [HttpPost]
        [Route("")]
        public IHttpActionResult Post([FromBody] Customer customer)
        {
            return Ok(customer);
        }

        private Customer CreateMockCustomer()
        {
            var customer = new Customer
            {
                Name = "Sample Name",
                Age = 33,
                Address =
                {
                    Country = "Australia",
                    Postcode = 2000,
                    State = "NSW",
                    StreetName = "George St",
                    StreetNumber = 1,
                    Suburb = "Sydney",
                },
                Orders = CreateMockOrders()
            };
            return customer;
        }

        private List<Customer> CreateMockCustomers()
        {
            var customers = new List<Customer>();
            for (int i = 0; i < 10; i++)
            {
                var customer = CreateMockCustomer();
                customers.Add(customer);
            }
            return customers;
        }

        private List<Order> CreateMockOrders()
        {
            var orders = new List<Order>();
            for (int i = 0; i < 3; i++)
            {
                var order = CreateMockOrder();
                orders.Add(order);
            }
            return orders;
        }

        private Order CreateMockOrder()
        {
            var products = CreateMockProducts();
            var order = new Order {
                Products = products,
                TotalPrice = products.Sum<Product>(x => x.Price)
            };

            return order;
        }

        private List<Product> CreateMockProducts()
        {
            var products = new List<Product>();
            for (int i = 0; i < 3; i++)
            {
                var product = CreateMockProduct();
                products.Add(product);
            }
            return products;
        }

        private Product CreateMockProduct()
        {
            return new Product { Title = "Sample Product", Price = 10 };
        }
    }
}
