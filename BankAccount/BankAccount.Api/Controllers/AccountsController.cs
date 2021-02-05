using BankAccount.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BankAccount.Api.Controllers
{
    /// <summary>
    /// The accounts controller.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class AccountsController : ControllerBase
    {
        /// <summary>
        /// The account respository.
        /// </summary>
        private readonly IAccountRepository _repository;

        /// <summary>
        /// The logger.
        /// </summary>
        private readonly ILogger<AccountsController> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountsController"/>.
        /// </summary>
        /// <param name="repository">The bank account repository.</param>
        /// <param name="logger">The logger.</param>
        public AccountsController(IAccountRepository repository,
            ILogger<AccountsController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        /// <summary>
        /// Fetches all bank accounts.
        /// </summary>
        /// <returns>The collection of bank accounts.</returns>
        [HttpGet]
        public IActionResult FetchAll()
        {
            var accounts = _repository.Fetch();
            _logger.LogInformation("Fetches all accounts");
            return new JsonResult(accounts);
        }

        /// <summary>
        /// Fetches a bank account by ID.
        /// </summary>
        /// <param name="accountId">The bank account ID.</param>
        /// <returns>The bank account.</returns>
        [HttpGet("{id}")]
        public IActionResult FetchById(string accountId)
        {
            var account = _repository.FetchById(accountId);
            return new JsonResult(account);
        }

        /// <summary>
        /// Creates a new bank account.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <param name="amount">The initial deposit amount.</param>
        /// <returns>The newly created bank account.</returns>
        [HttpPost]
        public IActionResult Create(string userId, double amount)
        {
            var account = _repository.Create(userId, amount);
            return new JsonResult(account);
        }

        /// <summary>
        /// Deletes a bank account by ID.
        /// </summary>
        /// <param name="accountId">The bank account ID.</param>
        /// <returns>The flag indicates whether the delete operation was successful or not.</returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(string accountId)
        {
            var deleted = _repository.Delete(accountId);
            return new JsonResult(new { Successful = deleted });
        }

        /// <summary>
        /// Deposits money into bank account.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <param name="accountId">The bank account ID.</param>
        /// <param name="amount">The depositing amount.</param>
        /// <returns>The flag indicates whether deposit operation was successful.</returns>
        [HttpPost("deposit")]
        public IActionResult Deposit(string userId, string accountId, double amount)
        {
            var successful = _repository.Deposit(userId, accountId, amount);
            return new JsonResult(new { Successful = successful });
        }

        /// <summary>
        /// Widthdraws a specified amount of money from a bank account.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <param name="accountId">The bank account ID.</param>
        /// <param name="amount">The widthrawing amount.</param>
        /// <returns>The flag indicates whether the widthdawing operation was successful.</returns>
        [HttpPost("widthdraw")]
        public IActionResult Widthdraw(string userId, string accountId, double amount)
        {
            var successful = _repository.Widthdraw(userId, accountId, amount);
            return new JsonResult(new { Successful = successful });
        }
    }
}
