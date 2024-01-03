import React, { useState, useEffect } from "react";
import Web3 from "web3";

const LicenseForm = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const [newLicensor, setNewLicensor] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Connect to the local Ethereum node
        const web3Instance = new Web3("http://localhost:8545");
        setWeb3(web3Instance);

        // Get the accounts
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        // Set the contract address (replace with your actual contract address)
        const contractAddress = "CONTRACT_ADDRESS";
        const contractInstance = new web3Instance.eth.Contract(
          // Replace with your contract ABI
          [],
          contractAddress
        );
        setContract(contractInstance);
      } catch (error) {
        console.error("Error initializing web3:", error);
      }
    };

    initWeb3();
  }, []);

  const handleUpdateLicensor = async (e) => {
    e.preventDefault();

    try {
      await contract.methods.updateLicensor(newLicensor).send({ from: account });
      console.log("Licensor updated successfully");
    } catch (error) {
      console.error("Error updating licensor:", error);
    }
  };

  const handleWithdrawFunds = async (e) => {
    e.preventDefault();

    try {
      await contract.methods.withdrawFunds().send({ from: account });
      console.log("Funds withdrawn successfully");
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      await contract.methods.sendTransaction().send({
        from: account,
        value: web3.utils.toWei(amount, "ether"),
      });
      console.log("Payment received successfully");
    } catch (error) {
      console.error("Error receiving payment:", error);
    }
  };

  return (
    <div>
      <h2>License Contract Form</h2>
      <form onSubmit={handleUpdateLicensor}>
        <label>
          New Licensor Address:
          <input
            type="text"
            value={newLicensor}
            onChange={(e) => setNewLicensor(e.target.value)}
          />
        </label>
        <button type="submit">Update Licensor</button>
      </form>

      <form onSubmit={handleWithdrawFunds}>
        <button type="submit">Withdraw Funds</button>
      </form>

      <form onSubmit={handlePayment}>
        <label>
          Amount (ETH):
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button type="submit">Send Payment</button>
      </form>
    </div>
  );
};

export default LicenseForm;