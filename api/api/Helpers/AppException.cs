namespace api.Helpers;

using System.Globalization;
public class AppException : Exception
{
    public Dictionary<string, string[]> Errors { get; set; } = new Dictionary<string, string[]>();

    public AppException(string message, string key, string[] value) : base(message) {
        
        Errors.Add(key, value);
    }

    public AppException(string message) : base(message)
    {
    }
}
