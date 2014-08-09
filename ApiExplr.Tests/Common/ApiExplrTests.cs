using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ApiExplr.Common;
using ApiExplr.Tests.Common.Mocks;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Http;

namespace ApiExplr.Tests.Common
{
    [TestClass]
    public class ApiExplrTests
    {
        private List<EndpointModel> endpoints;

        [TestInitialize]
        public void Init()
        {
            var pathToFile = XmlLocator.GetPath();
            var reflector = new ApiReflector(typeof(MockApiController), typeof(ApiController), pathToFile);
            endpoints = reflector.CollectEndpoints();
        }

        [TestMethod]
        public void FirstEndpoint_Created()
        {
            Assert.AreEqual(endpoints.Count(), 1);
        }

        [TestMethod]
        public void FirstEndpoint_HasInfo()
        {
            var info = endpoints.First().Info;
            Assert.AreEqual(info, "A mock web api controller.");
        }

        [TestMethod]
        public void FirstEndpoint_FirstAction_HasInfo()
        {
            var info = endpoints.First().Actions.First().Info;
            Assert.AreEqual(info, "Let's find a group!");
        }

        [TestMethod]
        public void FirstEndpoint_SameNameAction_Collection()
        {
            Assert.AreEqual(endpoints.First().Actions.Where(x => x.Name == "DoSimilarStuff").Count(), 2);
        }

        [TestMethod]
        public void FirstEndpoint_SameNameAction_FirstCorrectInfo()
        {
            var info = endpoints.First().Actions.Where(x => x.Name == "DoSimilarStuff").ElementAt(0).Info;
            Assert.AreEqual(info, "Do Similar Stuff (Part 1).");
        }

        [TestMethod]
        public void FirstEndpoint_SameNameAction_SecondCorrectInfo()
        {
            var info = endpoints.First().Actions.Where(x => x.Name == "DoSimilarStuff").ElementAt(1).Info;
            Assert.AreEqual(info, "Do Similar Stuff (Part 2).");
        }

        [TestMethod]
        public void FirstEndpoint_GetPopulation_Info()
        {
            var info = endpoints.First().Actions.Where(x => x.Name == "Population").First().Info;

            Assert.AreEqual(info, "Get population. I don't take no parameters.");
        }
    }
}
