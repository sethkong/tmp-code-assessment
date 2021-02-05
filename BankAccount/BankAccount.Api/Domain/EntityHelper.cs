using System;

namespace BankAccount.Api.Domain
{
    /// <summary>
    /// The entity helper.
    /// </summary>
    public class EntityHelper
    {
        /// <summary>
        /// Generates a new uuid string.
        /// </summary>
        /// <returns>The newly generated uuid string.</returns>
        public static string GenerateId()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
