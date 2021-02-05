using BankAccount.I18n;
using FluentValidation;

namespace BankAccount.Api.Domain.Validators
{
    public class AccountValidator : AbstractValidator<Account>
    {
        public AccountValidator()
        {
            RuleFor(x => x.Balance).NotNull()
                .WithMessage(Resource.Validator_Account_Balance)
                .GreaterThanOrEqualTo(100.00)
                .WithMessage(Resource.Validator_Account_Minimum_Balance);

            RuleFor(x => x.UserId).NotEmpty()
                .WithMessage(Resource.Validator_Account_UserId);

            RuleFor(x => x.AccountNumber).NotEmpty()
                .WithMessage(Resource.Validator_Account_Account_Number);

            RuleFor(x => x.RoutingNumber).NotEmpty()
                .WithMessage(Resource.Validator_Account_Routing_Number);
        }
    }
}
