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

interface TransactionContextType {
  transactions: Transaction[];
  // assíncrona; Expor funcao para conseguirmos filtrar as transações.
  fetchTransactions: (query?: string) => Promise<void>;
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
        q: query,
      }
    })

    setTransactions(response.data);
  };

  // useEffect não aceita async/await https://www.designcise.com/web/tutorial/why-cant-react-useeffect-callback-be-async
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};