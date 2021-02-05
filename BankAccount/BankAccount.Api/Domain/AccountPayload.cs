namespace BankAccount.Api.Domain
{
    /// <summary>
    /// The create-account view model.
    /// </summary>
    public class AccountPayload
    {
        /// <summary>
        /// Gets or sets the user Id.
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// Gets or sets the bank account amount.
        /// </summary>
        public double Amount { get; set; }

        /// <summary>
        /// Gets or set the account Id.
        /// </summary>
        public string AccountId { get; set; }
    }
}
