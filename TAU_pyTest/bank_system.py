from typing import Dict


class InsufficientFundsError(Exception):
    """Wyjątek podnoszony przy niewystarczającym saldzie."""
    pass


class Account:
    def __init__(self, account_number: str, owner: str, initial_balance: float = 0.0):
        self.account_number = account_number
        self.owner = owner
        self.balance = initial_balance

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Kwota wpłaty musi być większa niż 0.")
        self.balance += amount

    def withdraw(self, amount: float):
        if amount > self.balance:
            raise InsufficientFundsError("Saldo jest niewystarczające.")
        if amount <= 0:
            raise ValueError("Kwota wypłaty musi być większa niż 0.")
        self.balance -= amount

    async def transfer(self, to_account: "Account", amount: float):
        if amount > self.balance:
            raise InsufficientFundsError("Saldo jest niewystarczające.")
        if amount <= 0:
            raise ValueError("Kwota transferu musi być większa niż 0.")
        self.balance -= amount
        to_account.balance += amount


class Bank:
    def __init__(self):
        self.accounts: Dict[str, Account] = {}

    def create_account(self, account_number: str, owner: str, initial_balance: float = 0.0):
        if account_number in self.accounts:
            raise ValueError("Konto z podanym numerem już istnieje.")
        self.accounts[account_number] = Account(account_number, owner, initial_balance)

    def get_account(self, account_number: str) -> Account:
        if account_number not in self.accounts:
            raise ValueError("Nie znaleziono konta o podanym numerze.")
        return self.accounts[account_number]

    @staticmethod
    async def process_transaction(transaction_func):
        await transaction_func()
