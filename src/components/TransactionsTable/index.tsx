import { useEffect, useState } from "react";
import { SearchForm } from "../SearchForm";
import {
  TransactionsContainer,
  Table,
  PriceHighLight
} from "./styles";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions');
    const data = await response.json();

    setTransactions(data);
  };

  // useEffect não aceita async/await https://www.designcise.com/web/tutorial/why-cant-react-useeffect-callback-be-async
  useEffect(() => {
    loadTransactions();
  }, []);


  return (
    <TransactionsContainer>
      <SearchForm />
      <Table>
        <tbody>
          {transactions.map(transaction => {
            return (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighLight variant={transaction.type}>
                    {transaction.price}
                  </PriceHighLight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </TransactionsContainer >
  )
}