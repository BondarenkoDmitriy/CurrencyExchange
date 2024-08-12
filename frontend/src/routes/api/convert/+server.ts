import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const fromCurrency = url.searchParams.get('from');
  const toCurrency = url.searchParams.get('to');
  const amount = parseFloat(url.searchParams.get('amount') || '0');

  const res = await fetch('http://localhost:3000/exchange_rates');
  const exchangeRates = await res.json();

  const fromRate = exchangeRates.find((rate: any) => rate.currency_code === fromCurrency)?.rate_to_uah;
  const toRate = exchangeRates.find((rate: any) => rate.currency_code === toCurrency)?.rate_to_uah;

  if (fromRate && toRate) {
    const result = (amount / fromRate) * toRate;
    return new Response(JSON.stringify({ result }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'Invalid currencies' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 400,
  });
};