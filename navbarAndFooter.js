fetch('components/navbar.html')
    .then(response => response.text())
    .then(html => {
        // Create a temporary element to hold the fetched HTML content
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;

        // Extract script elements from the fetched HTML content
        const scripts = tempElement.querySelectorAll('script');

        // Execute each script
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            document.body.appendChild(newScript);
        });

        // Insert the fetched HTML content into the DOM
        document.getElementById('navbar').innerHTML = tempElement.innerHTML;
    });

fetch('components/footer.html')
    .then(response => response.text())
    .then(html => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        document.getElementById('footer').innerHTML = tempElement.innerHTML;
    })
