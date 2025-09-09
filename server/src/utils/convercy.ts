export async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<number> {
  if (from === to) return amount;

  const res = await fetch(
    `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
  );
  const data = await res.json();
  return data.result ?? amount;
}
