using BankAccount.Api.Domain;
using BankAccount.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BankAccount.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        /// <summary>
        /// The user respository.
        /// </summary>
        private readonly IUserRepository _repository;

        /// <summary>
        /// The logger.
        /// </summary>
        private readonly ILogger<UsersController> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="UsersController"/>.
        /// </summary>
        /// <param name="repository">The user repository.</param>
        /// <param name="logger">The logger.</param>
        public UsersController(IUserRepository repository,
            ILogger<UsersController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        /// <summary>
        /// Fetches all users.
        /// </summary>
        /// <returns>The collection of users.</returns>
        [HttpGet]
        public IActionResult FetchAll()
        {
            var users = _repository.Fetch();
            _logger.LogInformation("Fetches all users");
            return new JsonResult(users);
        }

        /// <summary>
        /// Fetches a user by ID.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The user.</returns>
        [HttpGet("{id}")]
        public IActionResult FetchById(string userId)
        {
            var user = _repository.FetchById(userId);
            return new JsonResult(user);
        }

        /// <summary>
        /// Creates a new user.
        /// </summary>
        /// <param name="user">The instance of the <see cref="User"/>.</param>
        /// <returns>The newly created user.</returns>
        [HttpPost]
        public IActionResult Create([FromBody] User user)
        {
            var newUser = _repository.Create(user);
            return new JsonResult(newUser);
        }

        /// <summary>
        /// Deletes a user by ID.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The flag indicates whether the delete opeation was successful or not.</returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(string userId)
        {
            var deleted = _repository.Delete(userId);
            return new JsonResult(new { Successful = deleted });
        }
    }
}
