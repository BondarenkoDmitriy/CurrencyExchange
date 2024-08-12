<script lang="ts">
  let exchangeRates: { id: number, currency_code: string, rate_to_uah: number }[] = [];
  let amount: number = 0;
  let fromCurrency: string = 'USD';
  let toCurrency: string = 'EUR';
  let result: number = 0;

  async function fetchExchangeRates(): Promise<void> {
    const response = await fetch('http://localhost:3000/exchange_rates');
    exchangeRates = await response.json();
  }

  function convertCurrency(): void {
    const fromRate = exchangeRates.find(rate => rate.currency_code === fromCurrency)?.rate_to_uah || 1;
    const toRate = exchangeRates.find(rate => rate.currency_code === toCurrency)?.rate_to_uah || 1;
    result = (amount * fromRate) / toRate;
  }

  fetchExchangeRates();
</script>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }

  .converter {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 20px;
  }

  input, select {
    padding: 10px;
    font-size: 1em;
  }

  button {
    padding: 10px 20px;
    font-size: 1em;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  p.result {
    font-size: 1.2em;
    font-weight: bold;
    margin-top: 20px;
    text-align: center;
  }
</style>

<main>
  <h1>Currency Converter</h1>

  <div class="converter">
    <input type="number" bind:value={amount} min="0" placeholder="Amount" />
    
    <select bind:value={fromCurrency}>
      {#each exchangeRates as rate}
        <option value={rate.currency_code}>{rate.currency_code}</option>
      {/each}
    </select>
    
    <span>to</span>
    
    <select bind:value={toCurrency}>
      {#each exchangeRates as rate}
        <option value={rate.currency_code}>{rate.currency_code}</option>
      {/each}
    </select>
    
    <button on:click={convertCurrency}>Convert</button>
  </div>

  <p class="result">Result: {result.toFixed(2)}</p>

  <h2>Current Exchange Rates</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Currency Code</th>
        <th>Rate to UAH</th>
      </tr>
    </thead>
    <tbody>
      {#each exchangeRates as rate}
        <tr>
          <td>{rate.id}</td>
          <td>{rate.currency_code}</td>
          <td>{rate.rate_to_uah.toFixed(4)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>