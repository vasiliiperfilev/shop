namespace api.Models.Order;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using api.Models.Item;

public class Order
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    [Required]
    [JsonIgnore]
    public string UserId { get; set; } = null!;

    [BsonElement("date")]
    public DateTime date { get; } = DateTime.Now;

    [BsonElement("items")]
    [Required]
    public List<OrderItem> Items { get; set; } = new List<OrderItem>();
}
