using BankAccount.Api.Domain;
using BankAccount.Api.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BankAccount.Api.Test
{
    [TestClass]
    public class UserRepositoryTest
    {
        private IUserRepository _userRepository;
        private User _user1;
        private User _user2;
        private User _user3;
        private User _user4;

        [TestInitialize]
        public void Initialize()
        {
            _userRepository = new UserRepository();

            _user1 = new User 
            { 
                FirstName = "Jane",
                LastName = "Doe",
                Password = "Aloha123",
                Email = "jane.doe@example.com",
                Phone = "(980) 505-3333"
            };

            _user2 = new User
            {
                FirstName = "John",
                LastName = "Doe",
                Password = "Aloha456",
                Email = "john.doe@example.com",
                Phone = "(980) 505-4444"
            };

            _user3 = new User
            {
                FirstName = "Mike",
                LastName = "MacKay",
                Password = "Aloha555",
                Email = "mike.mckay@example.com",
                Phone = "(980) 505-5555"
            };

            _user4 = new User
            {
                FirstName = "McKenzy",
                LastName = "Will",
                Password = "Aloha555",
                Email = "mckenzy.will@example.com",
                Phone = "(980) 505-7777"
            };
        }

        [TestCleanup]
        public void Cleanup()
        {
            _userRepository = null;
            _user2 = _user1 = null;
        }

        [TestMethod]
        public void TestCreate()
        {
            var user2 = _userRepository.Create(_user2);
            Assert.IsTrue(IsUserEqual(user2, _user2));
        }

        [TestMethod]
        public void TestDelete()
        {
            var user3 = _userRepository.Create(_user3);
            var deleted = _userRepository.Delete(user3.Id);
            Assert.IsTrue(deleted);
        }

        [TestMethod]
        public void TestFetchById()
        {
            var user4 = _userRepository.Create(_user4);
            var newUser = _userRepository.FetchById(user4.Id);
            Assert.IsNotNull(newUser);
        }

        [TestMethod]
        public void TestFetch()
        {
            var user1 = _userRepository.Create(_user1);
            Assert.IsTrue(IsUserEqual(user1, _user1));
            var users = _userRepository.Fetch();
            Assert.IsTrue(users.Count > 0);
        }

        private bool IsUserEqual(User user1, User user2)
        {
            return user1 != null && user2 != null
                && user1.FirstName == user2.FirstName
                && user1.LastName == user2.LastName
                && user1.Phone == user2.Phone
                && user1.Email == user2.Email;
        }
    }
}
