export async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<number> {
  if (from === to) return amount;

  const res = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
  );

  const data = await res.json();

  return data.rates[to] ?? amount;
}
