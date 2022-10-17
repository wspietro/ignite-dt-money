import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { SearchForm } from "../SearchForm";
import {
  TransactionsContainer,
  Table,
  PriceHighLight
} from "./styles";

export function TransactionsTable() {
  const { transactions } = useContext(TransactionsContext);

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