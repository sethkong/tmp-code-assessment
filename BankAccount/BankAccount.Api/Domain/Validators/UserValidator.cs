using BankAccount.I18n;
using FluentValidation;

namespace BankAccount.Api.Domain.Validators
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(x => x.Username).NotEmpty().WithMessage(Resource.Validator_User_Username)
               .Length(5, 50).WithMessage(Resource.Validator_User_Username_Length);

            // First Name
            RuleFor(x => x.FirstName).NotEmpty().WithMessage(Resource.Validator_User_FirstName)
                .Length(1, 50).WithMessage(Resource.Validator_User_FirstName_Length);

            // Last Name 
            RuleFor(x => x.LastName).NotEmpty().WithMessage(Resource.Validator_User_LastName)
                .Length(1, 50).WithMessage(Resource.Validator_User_LastName_Length);

            // Password 
            RuleFor(x => x.Password).NotEmpty().WithMessage(Resource.Validator_User_Password)
                .Length(8, 50).WithMessage(Resource.Validator_User_Password_Length);

            // Email 
            RuleFor(x => x.Email).EmailAddress().WithMessage(Resource.Validator_User_Email_Format);

            // Phone 
            //When(x => !string.IsNullOrWhiteSpace(x.Phone), () =>
            //{
            //    RuleFor(x => x.Phone).MinimumLength(9)
            //        .WithMessage(Resource.Validator_User_Phone_Length);
            //});
        }
    }
}
