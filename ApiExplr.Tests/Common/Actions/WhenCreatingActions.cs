﻿using System;
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
        public void ShouldHaveInfo()
        {
            var methodInfo = typeof(MockApiController).GetMethod("FindGroup");
            var actionModel = _ApiReflector.CreateAction(methodInfo);
            Assert.AreEqual(actionModel.Info, "Let's find a group!");
        }
    }
}
