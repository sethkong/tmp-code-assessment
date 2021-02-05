using BankAccount.Api.Domain;
using System.Collections.Generic;

namespace BankAccount.Api.Repositories
{
    public interface IAccountRepository
    {
        Account FetchById(string accountId);
        IList<Account> Fetch();
        Account Create(string userId, double balance = 100);
        bool Delete(string accountId);
        ApiMessage Widthdraw(string userId, string accountId, double amount);
        ApiMessage Deposit(string userId, string accountId, double amount);
    }
}
