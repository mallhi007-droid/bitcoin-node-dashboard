document.addEventListener("DOMContentLoaded", function() {
    const nodeCountElement = document.getElementById('node-count');
    const nodePercentageElement = document.getElementById('node-percentage');
    const enableNotifications = document.getElementById('enable-notifications');

    // Fetch node data from Bitnodes API
    function fetchNodeData() {
        fetch('https://bitnodes.io/api/v1/nodes/')
            .then(response => response.json())
            .then(data => {
                const nodeCount = data.data.nodes;
                nodeCountElement.textContent = nodeCount;
                
                // Assuming total count is known or static
                const totalNodes = 1000000; // Example total
                const nodePercentage = ((nodeCount / totalNodes) * 100).toFixed(2);
                nodePercentageElement.textContent = `${nodePercentage}%`;
                
                if (enableNotifications.checked) {
                    new Notification(`Node count changed: ${nodeCount}`);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Request notification permissions
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    // Fetch data every 60 seconds
    setInterval(fetchNodeData, 60000);
    fetchNodeData(); // Initial fetch
});
