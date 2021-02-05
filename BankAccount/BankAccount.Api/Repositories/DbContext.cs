using BankAccount.Api.Domain;
using System.Collections.Generic;

namespace BankAccount.Api.Repositories
{
    public class DbContext
    {
        /// <summary>
        /// The account collection.
        /// </summary>
        public static IList<Account> Accounts = new List<Account>();

        /// <summary>
        /// The user collection.
        /// </summary>
        public static IList<User> Users = new List<User>();
    }
}
