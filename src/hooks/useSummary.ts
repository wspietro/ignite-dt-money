import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {
  const { transactions } = useContext(TransactionsContext);

  // Reduzir meu array de transactions para essa estrutura de dados
  // {income: 0, outcome: 0, total: income - outcome}
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    },
    {
      // acc
      income: 0,
      outcome: 0,
      total: 0
    }
  );

  return summary
}