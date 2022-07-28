namespace api.Dao;

using api.Models.Order;
public interface IOrderDao
{
    Task<Order?> GetById(string id);
    Task Create(Order order);
    Task<Order> Update(string id, Order order);
    void Remove(string id);
}
