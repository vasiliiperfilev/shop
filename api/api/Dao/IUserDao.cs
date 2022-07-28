namespace api.Dao;

using api.Models.User;

public interface IUserDao
{
    Task<User?> GetById(string id);
    Task<User?> GetByEmail(string email);
    Task Create(User user);
    Task<User> Update(string id, User user);
    void Remove(string id);
}

