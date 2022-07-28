namespace api.Dao;

using api.Models;
using api.Models.User;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class UserDao : IUserDao
{
    private readonly IMongoCollection<User> _users;

    public UserDao(IMongoClient mongoClient, IOptions<StoreDatabaseSettings> storeDatabaseSettings)
    {
        var database = mongoClient.GetDatabase(storeDatabaseSettings.Value.DatabaseName);
        _users = database.GetCollection<User>(storeDatabaseSettings.Value.UserCollectionName);
    }

    async Task<User?> IUserDao.GetByEmail(string email) =>
        await _users.Find(x => x.Email.Equals(email)).FirstOrDefaultAsync();

    User? IUserDao.GetByEmailSync(string email) =>
        _users.Find(x => x.Email.Equals(email)).FirstOrDefault();

    async Task IUserDao.Create(User user) =>
        await _users.InsertOneAsync(user);

    async Task<User?> IUserDao.GetById(string id) => 
        await _users.Find(x => x.Id.Equals(id)).FirstOrDefaultAsync();

    async void IUserDao.Remove(string id) =>
        await _users.DeleteOneAsync(x => x.Id.Equals(id));

    async Task<User> IUserDao.Update(string id, User user)
    {
        await _users.ReplaceOneAsync(x => x.Id.Equals(id), user);
        return user;
    }
}

