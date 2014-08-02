using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace ApiExplorer.Tests.Common.Mocks
{
    /// <summary>
    /// A mock web api controller base class.
    /// </summary>
    public class MockBaseApiController : ApiController
    {
    }

    public class MockEnquiryModel
    {
        public bool IncludeDetail { get; set; }
    }

    /// <summary>
    /// A mock web api controller.
    /// </summary>
    public class MockApiController : MockBaseApiController
    {
        /// <summary>
        /// Let's find a group!
        /// </summary>
        /// <param name="Names"></param>
        [HttpGet]
        [Route("")]
        public IHttpActionResult FindGroup([FromUri] List<string> Names)
        {
            // Do nothing. This method has been created to test reflection.
            return Ok();
        }

        /// <summary>
        /// Let's set someone's age.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="age"></param>
        [HttpGet]
        [Route("")]
        public IHttpActionResult SetAge([FromUri] int id, [FromUri] int age)
        {
            // Do nothing. This method has been created to test reflection.
            return Ok();
        }

        /// <summary>
        /// Let's set the age of a group of people.
        /// </summary>
        /// <param name="Names"></param>
        /// <param name="age"></param>
        [HttpGet]
        [Route("")]
        public IHttpActionResult SetAges([FromUri] List<string> Names, [FromUri] int age)
        {
            // Do nothing. This method has been created to test reflection.
            return Ok();
        }

        /// <summary>
        /// Let's find lots of groups!
        /// </summary>
        /// <param name="Names"></param>
        /// <param name="age"></param>
        [HttpGet]
        [Route("")]
        public IHttpActionResult FindGroups([FromUri] int stateId, [FromUri] MockEnquiryModel enquiryModel)
        {
            // Do nothing. This method has been created to test reflection.
            return Ok();
        }

        /// <summary>
        /// Get population. I don't take no parameters.
        /// </summary>
        /// <param name="Names"></param>
        /// <param name="age"></param>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Population()
        {
            // Do nothing. This method has been created to test reflection.
            return Ok();
        }

        // don't place a comment on this action.
        [HttpGet]
        [Route("")]
        public IHttpActionResult ScaryNoComment()
        {
            // Do nothing. This method has been created to test reflection.
            return Ok();
        }

        /// <summary>
        /// Do Similar Stuff (Part 1).
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult DoSimilarStuff(int i)
        {
            return Ok();
        }

        /// <summary>
        /// Do Similar Stuff (Part 2).
        /// </summary>
        /// <param name="i"></param>
        /// <param name="s"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("")] 
        public IHttpActionResult DoSimilarStuff(int i, string s)
        {
            return Ok();
        }
    }

}
