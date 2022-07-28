namespace api.Models.User;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;
using System.Collections;
using Order = api.Models.Order.Order;
using System.ComponentModel.DataAnnotations;
using api.Helpers;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonIgnore]
    public string? Id { get; set; }

    [BsonElement("email")]
    [Required]
    [MaxLength(25,
        ErrorMessage = "Email max length is 25")]
    public string Email { get; set; } = null!;

    [BsonElement("password")]
    [Required]
    [MaxLength(25,
        ErrorMessage = "Password max length is 25")]
    [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$",
     ErrorMessage = "Password should be minimum 6 characters long, have 1 uppercase letter, 1 special character and 1 number")]
    [JsonIgnore]
    public string Password { get; set; } = null!;

    [BsonElement("address")]
    [Required]
    [MaxLength(100,
        ErrorMessage = "Address max length is 100")]
    public string Address { get; set; } = null!;

    [BsonElement("orders")]
    [JsonIgnore]
    public List<string> Orders { get; set; } = new List<string>(); 

}
