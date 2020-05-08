import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Transaction): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type is invalid.');
    }
    if (value < 0) {
      throw Error('Value can´t be negative.');
    }

    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > balance.total) {
      throw Error('You don´t have money to buy this.');
    }

    const transaction: Transaction = new Transaction({ title, value, type });
    this.transactionsRepository.create(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
