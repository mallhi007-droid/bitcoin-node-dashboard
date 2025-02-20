document.addEventListener("DOMContentLoaded", function () {
    const nodeCountElement = document.getElementById('node-count');
    const nodePercentageElement = document.getElementById('node-percentage');
    const enableNotifications = document.getElementById('enable-notifications');

    // Fetch node data from Blockchain.com API (alternative to Bitnodes)
    function fetchNodeData() {
        fetch('https://api.blockchain.info/stats')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const nodeCount = data.n_blocks_total; // Total blocks (proxy for network health)
                nodeCountElement.textContent = nodeCount;

                // Estimate node percentage (simulated calculation for demonstration)
                const totalNodes = 1000000; // Example static total
                const nodePercentage = ((nodeCount / totalNodes) * 100).toFixed(2);
                nodePercentageElement.textContent = `${nodePercentage}%`;

                // Send a notification if enabled
                if (enableNotifications.checked && Notification.permission === "granted") {
                    new Notification(`Node count updated: ${nodeCount}`);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                nodeCountElement.textContent = "Error";
                nodePercentageElement.textContent = "Error";
            });
    }

    // Request notification permission
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    // Fetch data every 60 seconds
    setInterval(fetchNodeData, 60000);
    fetchNodeData(); // Initial fetch
});
