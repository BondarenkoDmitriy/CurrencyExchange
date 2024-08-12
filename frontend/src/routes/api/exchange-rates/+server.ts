import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const res = await fetch('http://localhost:3000/exchange_rates'); // Запит до PostgREST API
  const exchangeRates = await res.json();

  return new Response(JSON.stringify(exchangeRates), {
    headers: { 'Content-Type': 'application/json' }
  });
};
