namespace api.Models.Item;

using api.Helpers;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class OrderItem
{
    [Required]
    [JsonPropertyName("id")]
    public string Id { get; set; } = null!;

    [Required]
    [MaxLength(100,
        ErrorMessage = "Name max length is 100")]
    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;

    [Required]
    [Range(0, 10000000)]
    [JsonPropertyName("quantity")]
    public double Quantity { get; set; }

    [Required]
    [Range(0, 10000000)]
    [JsonPropertyName("totalPrice")]
    public double TotalPrice { get; set; }

}
