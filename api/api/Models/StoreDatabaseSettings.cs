namespace api.Models
{
    public class StoreDatabaseSettings
    {
        public string DatabaseName { get; set; } = null!;
        public string UserCollectionName { get; set; } = null!;
        public string OrderCollectionName { get; set; } = null!;
    }
}
