# PrismJs Containerized
Containerized PrismJS which you can call using HTTP to get colorized syntax back.

![Test](https://github.com/sikora507/PrismJsContainerized/actions/workflows/test.yaml/badge.svg)

Works excellent with code plugin for TinyMCE, where the language is set on `<pre>` tag instead of `<code>` that's inside it.

By calling http endpoint from your backend service you get colorized syntax back that you can store in your database directly without including prismJs on your website. This will elimimate the delay between page load and colorized syntax appear.

Build docker image example:
```
docker build -t prismjs-containerized .
```

Run docker image on port 3000 example:
```
docker run --name prismjs-containerized -p 3000:3000 -d prismjs-containerized
```

Test using provided [highlight.http](./highlight.http) file for VsCode REST Client extension

