namespace BankAccount.Api.Domain
{
    /// <summary>
    /// The bank account.
    /// </summary>
    public class Account : BaseEntity
    {
        /// <summary>
        /// Gets or sets the bank account number.
        /// </summary>
        public string AccountNumber { get; set; }

        /// <summary>
        /// Gets or sets the routing number.
        /// </summary>
        public string RoutingNumber { get; set; }

        /// <summary>
        /// Gets or sets the account balance.
        /// </summary>
        public double Balance { get; set; }

        /// <summary>
        /// Gets or sets the user ID.
        /// </summary>
        public string UserId { get; set; }
    }
}
