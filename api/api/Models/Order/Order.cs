using api.Helpers;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using api.Models.Item;
using System.Text.Json.Serialization;

namespace api.Models.Order;

public class Order
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [Required]
    [JsonIgnore]
    public string UserId { get; set; } = null!;

    [BsonElement("date")]
    public DateTime date { get; } = DateTime.Now;

    [BsonElement("items")]
    [Required]
    [ItemsValidation]
    public List<OrderItem> Items { get; set; } = new List<OrderItem>();
}
