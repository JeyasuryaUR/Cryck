import {arweave} from '../config';

export async function uploadDataWithKey(ethAddress, data) {
    let transaction = await arweave.createTransaction({
        data: JSON.stringify(data),
    });

    // Add tags to the transaction
    transaction.addTag('Content-Type', 'application/json');
    transaction.addTag('App-Name', 'Cryck');
    transaction.addTag('Eth-Address', ethAddress);

    await arweave.transactions.sign(transaction, 'use_wallet');
    const response = await arweave.transactions.post(transaction);

    if (response.status === 200) {
        console.log(`Data uploaded successfully: Transaction ID - ${transaction.id}`);
        return transaction.id; // Returns the transaction ID
    } else {
        throw new Error('Data upload failed');
    }
}

export async function getDataForEthAddress(ethAddress) {
    const query = {
        query: `query {
            transactions(tags: [
                { name: "App-Name", values: ["Cryck"] },
                { name: "Eth-Address", values: ["${ethAddress}"] }
            ]) {
                edges {
                    node {
                        id
                    }
                }
            }
        }`
    };

    // Send the query to Arweave's GraphQL endpoint
    const response = await fetch('https://arweave.net/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse)
    // Assuming you get at least one transaction back
    if (jsonResponse.data.transactions.edges.length > 0) {
        const transactionId = jsonResponse.data.transactions.edges[0].node.id;
        // Use the transactionId to fetch the data
        const data = await arweave.transactions.getData(transactionId, {decode: true, string: true});
        return JSON.parse(data);
    } else {
        throw new Error('No data found for the provided Ethereum address');
    }
}
