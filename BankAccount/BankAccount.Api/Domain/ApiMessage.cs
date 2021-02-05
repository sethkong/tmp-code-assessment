namespace BankAccount.Api.Domain
{
    public class ApiMessage
    {
        /// <summary>
        /// Gets or sets the boolean value indicates whether the operation was successful.
        /// </summary>
        public bool Successful { get; set; }

        /// <summary>
        /// Gets or sets the operation message.
        /// </summary>
        public string Message { get; set; }
    }
}
