using BankAccount.Api.Domain;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;

namespace BankAccount.Api.Repositories
{
    /// <summary>
    /// The user repository that provides functionality to manage the users.
    /// </summary>
    public class UserRepository : IUserRepository
    {
        /// <summary>
        /// Creates a user.
        /// </summary>
        /// <param name="user">The instance of the <see cref="User"/></param>
        /// <returns>The newly created user.</returns>
        public User Create(User user)
        {
            if (DbContext.Users.Any(x => x.Email.Equals(user.Email, StringComparison.CurrentCulture) ||
                x.Phone.Equals(user.Phone, StringComparison.CurrentCulture)))
                return DbContext.Users.FirstOrDefault(x => x.Email == user.Email ||
                    x.Phone == user.Phone);

            user.PasswordHash = HashUserPassword(user.Password);
            user.Password = string.Empty;
            user.IsActive = true;
            user.IsEmailVerified = true;
            user.IsPhoneVerified = true;
            user.Username = user.Email;

            DbContext.Users.Add(user);

            var newUser = DbContext.Users.FirstOrDefault(x => x.Email.Equals(user.Email, StringComparison.CurrentCulture));

            if (newUser != null)
                newUser.PasswordHash = string.Empty;

            return newUser;
        }

        /// <summary>
        /// Deletes a single user by ID.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The value which indicates whether the delete operation was successful or not.</returns>
        public bool Delete(string userId)
        {
            if (!DbContext.Users.Any(x => x.Id == userId))
                return false;
            DbContext.Users = DbContext.Users.Where(x => x.Id != userId).ToList();
            return true;
        }

        /// <summary>
        /// Fetches all users.
        /// </summary>
        /// <returns>The collection of the users.</returns>
        public IList<User> Fetch()
        {
            foreach (var user in DbContext.Users)
                user.PasswordHash = string.Empty;

            return DbContext.Users;
        }

        /// <summary>
        /// Fetches a single user by ID.
        /// </summary>
        /// <param name="userId">The requested user ID.</param>
        /// <returns>The instance of the <see cref="User"/>.</returns>
        public User FetchById(string userId)
        {
            if (!DbContext.Users.Any(x => x.Id == userId))
                throw new Exception("User does not exist.");

            var user = DbContext.Users.FirstOrDefault(x => x.Id == userId);
            if (user != null)
            {
                user.PasswordHash = string.Empty;
                return user;
            }

            return null;
        }

        /// <summary>
        /// Hashes the user password.
        /// References: https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/consumer-apis/password-hashing?view=aspnetcore-5.0
        /// </summary>
        /// <param name="password">Hashes the user password.</param>
        /// <returns>The hashed password.</returns>
        private string HashUserPassword(string password)
        {
            byte[] salt = new byte[128 / 8];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashed;
        }
    }
}
