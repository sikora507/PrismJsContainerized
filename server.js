const express = require('express');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const Prism = require('prismjs');

// Load languages and plugins as needed
require('prismjs/components/')(['javascript', 'css', 'markup', 'csharp', 'python', 'json', 'yaml']); // Add other languages here

const app = express();
const port = 3000;

app.use(express.text({ type: 'text/html' }));

app.post('/highlight', (req, res) => {
    const { document } = (new JSDOM(req.body)).window;
    const preElements = document.querySelectorAll('pre[class*="language-"]');

    preElements.forEach((pre) => {
        // Extract the class name for language identification
        const languageClass = Array.from(pre.classList).find(className => className.startsWith('language-'));
        if (languageClass) {
            // Assume there is a single <code> element child, or target the first one
            const codeElement = pre.querySelector('code');
            if (codeElement) {
                // Transfer the language class from <pre> to <code>
                codeElement.className = languageClass;

                // Now highlight the code using Prism
                const language = languageClass.split('-')[1];
                if (Prism.languages[language]) {
                    const code = codeElement.textContent;
                    const highlightedCode = Prism.highlight(code, Prism.languages[language], language);
                    codeElement.innerHTML = highlightedCode;
                }
            }
        }
    });

    let responseContent = document.body.innerHTML;

    // If no code was highlighted (i.e., responseContent unchanged), return the original input
    if (responseContent.trim() === "") {
        res.send(req.body);
    } else {
        res.send(responseContent);
    }
});


app.listen(port, () => {
    console.log(`Prism microservice running at http://localhost:${port}`);
});

// Handle SIGINT (Ctrl+C) and SIGTERM (Docker stop)
const shutdown = (signal) => {
    console.log(`Received ${signal}. Shutting down gracefully.`);
    server.close(() => {
        console.log('HTTP server closed.');
        // If you're using a database or other services that need to be closed, do it here.
        process.exit(0);
    });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));