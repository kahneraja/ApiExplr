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
    public class WhenCreatingActions
    {
        private ApiReflector _ApiReflector;

        [TestInitialize]
        public void Init()
        {
            var pathToFile = XmlLocator.GetPath();
            _ApiReflector = new ApiReflector(typeof(MockApiController), typeof(ApiController), pathToFile);
        }

        [TestMethod]
        public void ShouldHaveCorrectInfo()
        {
            var methodInfo = typeof(MockApiController).GetMethod("FindGroup");
            var actionModel = _ApiReflector.CreateAction(methodInfo);
            Assert.AreEqual(actionModel.Info, "Let's find a group!");
        }

        [TestMethod]
        public void ShouldHaveCorrectNumberOfActions()
        {            
            var endpoint = _ApiReflector.CreateEndpoint(typeof(MockApiController));
            Assert.AreEqual(9, endpoint.Actions.Count);
        }

        [TestMethod]
        public void ShouldGetCorrectFirstInfoWithSameName()
        {
            var methodInfo = typeof(MockApiController).GetMethods().First(x => x.Name  == "DoSimilarStuff");
            var parameters = methodInfo.GetParameters().ToList();
            var info = _ApiReflector.GetActionInfo(methodInfo, parameters);
            Assert.AreEqual("Do Similar Stuff (Part 1).", info);
        }

        [TestMethod]
        public void ShouldGetCorrectLastInfoWithSameName()
        {
            var methodInfo = typeof(MockApiController).GetMethods().Last(x => x.Name == "DoSimilarStuff");
            var parameters = methodInfo.GetParameters().ToList();
            var info = _ApiReflector.GetActionInfo(methodInfo, parameters);
            Assert.AreEqual("Do Similar Stuff (Part 2).", info);
        }

        [TestMethod]
        public void ShouldGetCorrectInfoWithNoParameters()
        {
            var methodInfo = typeof(MockApiController).GetMethods().Last(x => x.Name == "Population");
            var parameters = methodInfo.GetParameters().ToList();
            var info = _ApiReflector.GetActionInfo(methodInfo, parameters);
            Assert.AreEqual(info, "Get population. I don't take no parameters.");
        }

        [TestMethod]
        public void ShouldResolveDeleteHttpMethod()
        {
            var methodInfo = typeof(MockApiController).GetMethods().Last(x => x.Name == "RemoveAccount");
            var httpMethod = _ApiReflector.GetHttpActions(methodInfo);
            Assert.AreEqual("DELETE", httpMethod);
        }
    }
}
