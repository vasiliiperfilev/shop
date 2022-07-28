using api.Helpers;
using api.Models.Item;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models.Order;

public class AddOrderRequest
{
    public string? UserId { get; set; }

    [Required]
    [ItemsValidation]
    public List<OrderItem> Items { get; set; } = new List<OrderItem>();
}
