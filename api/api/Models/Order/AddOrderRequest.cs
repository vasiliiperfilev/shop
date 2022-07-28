using api.Models.Item;
using System.ComponentModel.DataAnnotations;
namespace api.Models.Order;

public class AddOrderRequest
{
    public string? UserId { get; set; }

    [Required]
    public List<OrderItem> Items { get; set; } = new List<OrderItem>();
}
