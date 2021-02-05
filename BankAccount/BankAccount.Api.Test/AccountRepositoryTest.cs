using BankAccount.Api.Domain;
using BankAccount.Api.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace BankAccount.Api.Test
{
    [TestClass]
    public class AccountRepositoryTest
    {
        private IAccountRepository _accountRepository;
        private IUserRepository _userRepository;

        private User _user1;
        private User _user2;

        private Account _account1;
        private Account _account2;
        private Account _account3;
        private Account _account4;
        private Account _account5;
        private Account _account6;
        private Account _account7;
        private Account _account8;

        private User user1;
        private User user2;


        [TestInitialize]
        public void Initialize()
        {
            _accountRepository = new AccountRepository();
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

            user1 = _userRepository.Create(_user1);
            user2 = _userRepository.Create(_user2);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _accountRepository = null;
            _userRepository = null;
            _user1 = _user2 = null;
        }

        [TestMethod]
        public void TestCreate()
        {
            _account1 = _accountRepository.Create(user1.Id);
            Assert.IsNotNull(_account1);
            Assert.IsTrue(_account1.UserId == user1.Id);
            Assert.IsTrue(_account1.Balance == 100);

        }

        [TestMethod]
        public void TestDelete()
        {
            _account2 = _accountRepository.Create(user2.Id, 500);
            Assert.IsNotNull(_account2);
            Assert.IsTrue(_account2.UserId == user2.Id);
            Assert.IsTrue(_account2.Balance == 500);
            var deleted = _accountRepository.Delete(_account2.Id);
            Assert.IsTrue(deleted);
        }

        [TestMethod]
        public void TestWidthdraw()
        {
            _account3 = _accountRepository.Create(user1.Id, 999);
            Assert.IsNotNull(_account3);
            Assert.IsTrue(_account3.UserId == user1.Id);
            Assert.IsTrue(_account3.Balance == 999);
            var successful = _accountRepository.Widthdraw(user1.Id, _account3.Id, 500);
            Assert.IsTrue(successful);
            _account3 = _accountRepository.FetchById(_account3.Id);
            Assert.IsTrue(_account3.Balance == 499);
        }

        [TestMethod]
        public void TestWidthdawException()
        {
            _account4 = _accountRepository.Create(user1.Id, 999);
            Assert.IsNotNull(_account4);
            Assert.IsTrue(_account4.UserId == user1.Id);
            Assert.IsTrue(_account4.Balance == 999);
            Assert.ThrowsException<Exception>(() =>
            {
                _accountRepository.Widthdraw(user1.Id, _account4.Id, 900);
            });
        }

        [TestMethod]
        public void TestDeposit()
        {
            _account5 = _accountRepository.Create(user1.Id, 500);
            Assert.IsNotNull(_account5);
            Assert.IsTrue(_account5.UserId == user1.Id);
            Assert.IsTrue(_account5.Balance == 500);
            var deposited = _accountRepository.Deposit(user1.Id, _account5.Id, 500);
            Assert.IsTrue(deposited);
            _account5 = _accountRepository.FetchById(_account5.Id);
            Assert.IsTrue(_account5.Balance == 1000);
        }

        [TestMethod]
        public void TestDepositException()
        {
            _account6 = _accountRepository.Create(user1.Id, 500);
            Assert.IsNotNull(_account6);
            Assert.IsTrue(_account6.UserId == user1.Id);
            Assert.IsTrue(_account6.Balance == 500);
            Assert.ThrowsException<ArgumentException>(() =>
            {
                _accountRepository.Deposit(user1.Id, _account6.Id, 12000);
            });

        }

        [TestMethod]
        public void TestFechById()
        {
            _account7 = _accountRepository.Create(user1.Id, 999);
            Assert.IsNotNull(_account7);
            Assert.IsTrue(_account7.UserId == user1.Id);
            Assert.IsTrue(_account7.Balance == 999);
            _account7 = _accountRepository.FetchById(_account7.Id);
            Assert.IsNotNull(_account7);
        }

        [TestMethod]
        public void TestFetch()
        {
            _account8 = _accountRepository.Create(user1.Id, 999);
            Assert.IsNotNull(_account8);
            Assert.IsTrue(_account8.UserId == user1.Id);
            Assert.IsTrue(_account8.Balance == 999);
            var accounts = _accountRepository.Fetch();
            Assert.IsTrue(accounts.Count > 0);
        }
    }
}
