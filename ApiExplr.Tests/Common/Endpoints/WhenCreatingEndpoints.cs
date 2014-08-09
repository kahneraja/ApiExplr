using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ApiExplr.Common;
using ApiExplr.Tests.Common.Mocks;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Http;

namespace ApiExplr.Tests.Common.Endpoints
{
    [TestClass]
    public class WhenCreatingEndpoints
    {
        private List<EndpointModel> endpoints;

        [TestInitialize]
        public void Init()
        {
            var pathToFile = GetXmlPath();
            var reflector = new ApiReflector(typeof(MockApiController), typeof(ApiController), pathToFile);
            endpoints = reflector.CollectEndpoints();
        }

        [TestMethod]
        public void ShouldHaveOneEndpoint()
        {
            Assert.AreEqual(endpoints.Count(), 1);
        }

        [TestMethod]
        public void ShouldHaveInfo()
        {
            var info = endpoints.First().Info;
            Assert.AreEqual(info, "A mock web api controller.");
        }

        private static string GetXmlPath()
        {
            var filename = "XmlDocument.xml";
            string currentDir = new System.Diagnostics.StackFrame(true).GetFileName();
            var workingFile = new FileInfo(currentDir);
            var pathToFile = string.Format("{0}\\App_Data\\{1}", workingFile.Directory.Parent.Parent.FullName, filename);
            return pathToFile;
        }
    }
}
