using api.Models.Item;
using Newtonsoft.Json;
using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace api.Helpers;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
public class ItemsValidationAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        try
        {
            var list = (List<OrderItem>)value;

            if (list.Count > 10)
                return new ValidationResult("Order can't have more than 10 items");
        } catch
        {
            return new ValidationResult("Incorrect items type");
        }
        return ValidationResult.Success;
    }
}
