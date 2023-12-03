<template>
  <div class="container">
    <label for="walletInput">Enter Wallet:</label>
    <input v-model="walletInput" id="walletInput" placeholder="send wallet" />
    <button @click="searchWallet">Search Wallet</button>

    <div v-if="result.length > 0">
      <h2>Search Results:</h2>
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Balance</th>
            <th>Last Transaction</th>
          </tr>
        </thead>
        <tbody>
          Starlink
          <tr v-for="(item, index) in result" :key="index">
            <td>{{ item.address }}</td>
            <td>{{ item.balance }}</td>
            <td>{{ item.last_transaction }}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Balance</th>
            <th>Eligible</th>
          </tr>
        </thead>
        <tbody>
          Jupiter
          <tr v-for="(item, index) in resultJupiter" :key="index">
            <td>{{ item.address }}</td>
            <td>{{ item.balance }}</td>
            <td>{{ item.got_airdrop }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const walletInput = ref(localStorage.getItem("walletInput") || "");
const result = ref([]);
const resultJupiter = ref([]);

const searchWallet = async () => {
  try {
    const requestBody = {
      data: {
        wallets: [walletInput.value],
      },
    };

    let apiUrl = walletInput.value.includes("0x")
      ? "http://localhost:5000/check/starknet"
      : "http://localhost:5000/check/jupiter";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    if (walletInput.value.includes("0x")) {
      result.value.push(...(responseData.data || []));
    } else if (apiUrl === "http://localhost:5000/check/jupiter") {
      resultJupiter.value.push(...(responseData.data || []));
    }
  } catch (error) {
    console.error(error);
  }
};

watch(walletInput, () => {
  localStorage.setItem("walletInput", walletInput.value);
});

onMounted(() => {
  if (walletInput.value) {
    searchWallet();
  }
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #4caf50;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
