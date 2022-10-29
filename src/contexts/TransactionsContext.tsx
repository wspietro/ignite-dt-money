import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

// Não reutilixamos o código do NewTransactionFormInputs (zod) pois queremos desacoplar do componente modal;
interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionContextType {
  transactions: Transaction[];
  // assíncrona; Expor funcao para conseguirmos filtrar as transações.
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    // Receberemos uma query de busca opcional após expor a função no contexto;
    // Dessa forma, será possível filtrar as transações com a query.

    // const url = new URL('http://localhost:3333/transactions');

    // if (query) {
    //   url.searchParams.append('q', query)
    // }

    // const response = await fetch(url);
    // const data = await response.json();

    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })

    setTransactions(response.data);
  };

  async function createTransaction(data: CreateTransactionInput) {
    const { description, category, price, type } = data;

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(), // geralmente é criado pelo back end na vida real
    })

    setTransactions(prevState => [response.data, ...prevState])
  }

  // useEffect não aceita async/await https://www.designcise.com/web/tutorial/why-cant-react-useeffect-callback-be-async
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};