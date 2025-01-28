import pytest
from unittest.mock import AsyncMock, patch
from bank_system import Account, Bank, InsufficientFundsError


@pytest.fixture
def sample_account():
    return Account(account_number="12345", owner="Tomasz Wasielewski", initial_balance=100.0)


@pytest.fixture
def sample_bank():
    bank = Bank()
    bank.create_account("12345", "Dominik Hinc", 100.0)
    bank.create_account("67890", "Sylwia Juda", 1000.0)
    return bank


# Testy dla klasy Account
def test_account_deposit(sample_account):
    sample_account.deposit(50)
    assert sample_account.balance == 150


def test_account_withdraw(sample_account):
    sample_account.withdraw(50)
    assert sample_account.balance == 50


def test_account_withdraw_insufficient_funds(sample_account):
    with pytest.raises(InsufficientFundsError):
        sample_account.withdraw(200)


@pytest.mark.asyncio
async def test_account_transfer(sample_account):
    recipient = Account(account_number="67890", owner="Dupa", initial_balance=50.0)
    await sample_account.transfer(recipient, 50)
    assert sample_account.balance == 50
    assert recipient.balance == 100


# Testy dla klasy Bank
def test_bank_create_account(sample_bank):
    sample_bank.create_account("11111", "Tomasz Nowak", 200.0)
    account = sample_bank.get_account("11111")
    assert account.owner == "Tomasz Nowak"
    assert account.balance == 200.0


def test_bank_get_account(sample_bank):
    account = sample_bank.get_account("12345")
    assert account.owner == "Dominik Hinc"
    assert account.balance == 100.0


def test_bank_get_account_invalid(sample_bank):
    with pytest.raises(ValueError):
        sample_bank.get_account("99999")


@pytest.mark.asyncio
async def test_bank_process_transaction(sample_bank):
    account1 = sample_bank.get_account("12345")
    account2 = sample_bank.get_account("67890")

    async def transaction():
        await account1.transfer(account2, 50)

    await sample_bank.process_transaction(transaction)
    assert account1.balance == 50
    assert account2.balance == 1050


# Testowanie wyjątków
def test_account_deposit_invalid_amount(sample_account):
    with pytest.raises(ValueError):
        sample_account.deposit(-50)


def test_account_withdraw_invalid_amount(sample_account):
    with pytest.raises(ValueError):
        sample_account.withdraw(-50)


@pytest.mark.asyncio
async def test_account_transfer_invalid_amount(sample_account):
    recipient = Account(account_number="67890", owner="Anna Nowak", initial_balance=50.0)
    with pytest.raises(ValueError):
        await sample_account.transfer(recipient, -50)


# Mockowanie zewnętrznych systemów
@pytest.mark.asyncio
@patch("bank_system.Account.transfer", new_callable=AsyncMock)
async def test_mocked_transfer(mocked_transfer, sample_bank):
    account1 = sample_bank.get_account("12345")
    account2 = sample_bank.get_account("67890")

    await account1.transfer(account2, 30)
    mocked_transfer.assert_called_once_with(account2, 30)
