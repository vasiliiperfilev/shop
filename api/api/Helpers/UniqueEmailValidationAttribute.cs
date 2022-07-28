using api.Dao;
using System.ComponentModel.DataAnnotations;

namespace api.Helpers;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
public class UniqueEmailValidationAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var context = (IUserDao)validationContext.GetService(typeof(IUserDao));
        var sameEmailUser = context.GetByEmailSync(value.ToString());
        if (sameEmailUser is not null)
            return new ValidationResult("Email is taken");

        return ValidationResult.Success;
    }
}
