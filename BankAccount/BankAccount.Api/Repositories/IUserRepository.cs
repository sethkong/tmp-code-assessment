using BankAccount.Api.Domain;
using System.Collections.Generic;

namespace BankAccount.Api.Repositories
{
    public interface IUserRepository
    {
        IList<User> Fetch();
        User FetchById(string userId);
        User Create(User user);
        bool Delete(string userId);
    }
}
