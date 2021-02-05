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
        /// The user collection.
        /// </summary>
        private IList<User> _users = new List<User>();

        /// <summary>
        /// Creates a user.
        /// </summary>
        /// <param name="user">The instance of the <see cref="User"/></param>
        /// <returns>The newly created user.</returns>
        public User Create(User user)
        {
            if (_users.Any(x => x.Email.Equals(user.Email, StringComparison.CurrentCulture) ||
                x.Phone.Equals(user.Phone, StringComparison.CurrentCulture)))
                throw new ArgumentException("User already exists.");

            user.PasswordHash = HashUserPassword(user.Password);
            user.Password = string.Empty;
            user.IsActive = true;
            user.IsEmailVerified = true;
            user.IsPhoneVerified = true;
            user.Username = user.Email;

            _users.Add(user);

            return _users.FirstOrDefault(x => x.Email.Equals(user.Email, StringComparison.CurrentCulture));
        }

        /// <summary>
        /// Deletes a single user by ID.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The value which indicates whether the delete operation was successful or not.</returns>
        public bool Delete(string userId)
        {
            if (!_users.Any(x => x.Id == userId))
                return false;
            _users = _users.Where(x => x.Id != userId).ToList();
            return true;
        }

        /// <summary>
        /// Fetches all users.
        /// </summary>
        /// <returns>The collection of the users.</returns>
        public IList<User> Fetch()
        {
            foreach (var user in _users)
                user.PasswordHash = string.Empty;

            return _users;
        }

        /// <summary>
        /// Fetches a single user by ID.
        /// </summary>
        /// <param name="userId">The requested user ID.</param>
        /// <returns>The instance of the <see cref="User"/>.</returns>
        public User FetchById(string userId)
        {
            if (!_users.Any(x => x.Id == userId))
                throw new Exception("User does not exist.");

            var user = _users.FirstOrDefault(x => x.Id == userId);
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
