using ApiExplr.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ApiExplr.WebApi.Controllers
{
    /// <summary>
    /// Manage customer data.
    /// </summary>
    [RoutePrefix("api/customers")]
    [EnableCors("*", "*", "*")]
    public class CustomersController : ApiController
    {
        /// <summary>
        /// Return all customers
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetCustomers()
        {
            var customers = CreateMockCustomers();

            return Ok(customers);
        }


        /// <summary>
        /// Get customer detail.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult Get([FromUri] int id)
        {
            var customer = CreateMockCustomer();
            customer.Id = id;
            return Ok(customer);
        }

        /// <summary>
        /// Create new customer.
        /// </summary>
        /// <param name="value"></param>
        [HttpPost]
        [Route("")]
        public IHttpActionResult Post([FromBody] Customer customer)
        {
            return Ok(customer);
        }

        /// <summary>
        /// POST addresses to customer
        /// </summary>
        /// <param name="value"></param>
        [HttpPost]
        [Route("addresses/{id}")]
        public IHttpActionResult addresses([FromUri ] int id, [FromBody] List<Address> addresses)
        {
            return Ok(addresses);
        }

        private Customer CreateMockCustomer()
        {
            var customer = new Customer
            {
                Name = "Sample Name",
                Age = 33,
            };

            customer.Address = CreateMockAddress();
            customer.Orders = CreateMockOrders();
            return customer;
        }

        private Address CreateMockAddress()
        {
            return new Address {
                    Country = "Australia",
                    Postcode = 2000,
                    State = "NSW",
                    StreetName = "George St",
                    StreetNumber = 1,
                    Suburb = "Sydney",
                };
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
