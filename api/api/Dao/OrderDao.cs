namespace api.Dao;

using api.Dao;
using api.Models;
using api.Models.Order;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class OrderDao : IOrderDao
{
    private readonly IMongoCollection<Order> _orders;

    public OrderDao(IMongoClient mongoClient, IOptions<StoreDatabaseSettings> storeDatabaseSettings)
    {
        var database = mongoClient.GetDatabase(storeDatabaseSettings.Value.DatabaseName);
        _orders = database.GetCollection<Order>(storeDatabaseSettings.Value.OrderCollectionName);
    }

    async Task<Order?> IOrderDao.GetById(string id) =>
        await _orders.Find(x => x.Id.Equals(id)).FirstOrDefaultAsync();

    async Task IOrderDao.Create(Order order) =>
        await _orders.InsertOneAsync(order);

    async void IOrderDao.Remove(string id) =>
        await _orders.DeleteOneAsync(x => x.Id.Equals(id));

    async Task<Order> IOrderDao.Update(string id, Order order)
    {
        await _orders.ReplaceOneAsync(x => x.Id.Equals(id), order);
        return order;
    }
}

