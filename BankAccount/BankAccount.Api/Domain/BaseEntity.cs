using System;

namespace BankAccount.Api.Domain
{
    /// <summary>
    /// The base mobile represents the commom properties of the all domain models
    /// </summary>
    public class BaseEntity
    {
        /// <summary>
        /// Gets or set the unique identifier for a domain model 
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets the inserted date time
        /// </summary>
        public DateTime? InsertedAt { get; set; }

        /// <summary>
        /// Gets or sets the updated date time
        /// </summary>
		public DateTime? UpdatedAt { get; set; }

        /// <summary>
        /// Gets or sets the whether the document is active
        /// </summary>
		public bool IsActive { get; set; }

        /// <summary>
        /// Gets or sets the inserted by uniqued identifier
        /// </summary>
        public string InsertedBy { get; set; }

        /// <summary>
        /// Gets or sets the updated by unique identifier
        /// </summary>
        public string UpdatedBy { get; set; }

        /// <summary>
        /// Intializes a new instance of hte <see cref="BaseModel"/> type
        /// </summary>
		public BaseEntity()
        {
            this.Id = EntityHelper.GenerateId();
            this.InsertedAt = DateTime.UtcNow;
            this.UpdatedAt = DateTime.UtcNow;
            this.IsActive = true;
        }
    }
}