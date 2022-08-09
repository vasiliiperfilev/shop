namespace api.Models.Item;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class OrderItem
{
    [Required]
    [JsonPropertyName("id")]
    [MaxLength(100,
        ErrorMessage = "Name max length is 100")]
    public string Id { get; set; } = null!;

    [Required]
    [MaxLength(100,
        ErrorMessage = "Name max length is 100")]
    [JsonPropertyName("title")]
    public string Title { get; set; } = null!;

    [Required]
    [Range(0, 10000000)]
    [JsonPropertyName("quantity")]
    public double? Quantity { get; set; }

    [Required]
    [Range(0, 10000000)]
    [JsonPropertyName("price")]
    public double? Price { get; set; }

    [Required]
    [MaxLength(200,
        ErrorMessage = "Name max length is 200")]
    [JsonPropertyName("image")]
    public string? Image { get; set; }

}
