using BankAccount.Api.Domain;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BankAccount.Api.Repositories
{
    /// <summary>
    /// The bank account repository.
    /// </summary>
    public class AccountRepository : IAccountRepository
    {
        /// <summary>
        /// The bank account collection.
        /// </summary>
        private IList<Account> _accounts;

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountRepository"/>
        /// </summary>
        public AccountRepository()
        {
            _accounts = new List<Account>();
        }


        /// <summary>
        /// Fetches a bank account by its ID.
        /// </summary>
        /// <param name="accountId">The account Id.</param>
        /// <returns>The instance of the <see cref="BankAccount"/>.</returns>
        public Account FetchById(string accountId)
        {
            if (!_accounts.Any(x => x.Id == accountId))
                throw new ArgumentException("Bank account does not exist. Account Id: {0}", accountId);

            return _accounts.FirstOrDefault(x => x.Id == accountId);
        }

        /// <summary>
        /// Fetches all bank accounts.
        /// </summary>
        /// <returns>The collection of the bank accounts.</returns>
        public IList<Account> Fetch()
        {
            return _accounts;
        }

        /// <summary>
        /// Creates a new bank account for the given user.
        /// </summary>
        /// <param name="userId">The user unique identifier.</param>
        /// <param name="balance">The initial balance.</param>
        /// <returns>The newly created bank account.</returns>
        public Account Create(string userId, double balance = 100)
        {
            if (balance < 100 || balance > 1000)
                throw new ArgumentException("Initial balance must be at least 100 USD and less than 1,000 USD. Balance: {0}", balance.ToString());

            var account = new Account
            {
                UserId = userId,
                Balance = balance,
                AccountNumber = generateRoutingOrAccountNumber(isRouting: false),
                RoutingNumber = generateRoutingOrAccountNumber(isRouting: true)
            };
            _accounts.Add(account);

            return account;
        }

        /// <summary>
        /// Deletes a bank account.
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns>The value indicates wheteher an account was deleted successfully.</returns>
        public bool Delete(string accountId)
        {
            if (_accounts.Any(x => x.Id != accountId))
                return false; 

            _accounts = _accounts.Where(x => x.Id != accountId).ToList();

            return true;
        }

        /// <summary>
        /// Widthraws money from a bank account of a user.
        /// </summary>
        /// <param name="userId">The bank account owner.</param>
        /// <param name="accountId">The bank account ID.</param>
        /// <param name="amount">The amount to be withdrawn.</param>
        /// <returns>The value which indicates whether the withdrawal was successful or not.</returns>
        public bool Widthdraw(string userId, string accountId, double amount)
        {
            if (amount < 1.00)
                throw new ArgumentException("The withdraw amount must be greater than 0. Amount: {0}", amount.ToString());

            if (!_accounts.Any(x => x.UserId == userId && x.Id == accountId))
                throw new ArgumentException("User {0} does not have any account.", userId);

            var account = _accounts.FirstOrDefault(x => x.UserId == userId && x.Id == accountId); 

            if (account != null)
            {
                if ((account.Balance - amount) < 100)
                    throw new Exception("Minimum balance be at least 100 USD. Withrawal rejected.");

                if (amount > (account.Balance * .9))
                    throw new Exception("Cannot widthraw more than 90% of total balance.");

                account.Balance -= amount;
            }

            return true;
        }

        /// <summary>
        /// Deposits money into the bank account.
        /// </summary>
        /// <param name="userId">The user ID of the bank account owner.</param>
        /// <param name="accountId">The bank account ID.</param>
        /// <param name="amount">The depositing amount.</param>
        /// <returns>The value which indicates whether the transaction was successfuly or not.</returns>
        public bool Deposit(string userId, string accountId, double amount)
        {
            if (amount < 1.00)
                throw new ArgumentException("The deposit amount must be greater than 0. Amount: {0}", amount.ToString());

            if (amount > 10000)
                throw new ArgumentException("Cannot deposit more than 10,000 USD. Transaction rejected.");

            if (!_accounts.Any(x => x.UserId == userId && x.Id == accountId))
                throw new ArgumentException("User {0} does not have any account.", userId);

            var account = _accounts.FirstOrDefault(x => x.UserId == userId && x.Id == accountId);

            if (account != null)
                account.Balance += amount;

            return true;
        }

        /// <summary>
        /// Generates a routing or bank account number.
        /// </summary>
        /// <param name="isRouting">The value indicates whether it is a routing number or a bank account number.</param>
        /// <returns>The generated number.</returns>
        private string generateRoutingOrAccountNumber(bool isRouting)
        {
            var random = new Random();
            var minValue = isRouting ? 10000000 : 1000000000;
            var number = random.Next(minValue).ToString();
            while ((isRouting && _accounts.Any(x => x.RoutingNumber == number))
                || (!isRouting && _accounts.Any(x => x.AccountNumber == number)))
            {
                number = random.Next(minValue).ToString();
            }
            return number;
        }
    }
}
