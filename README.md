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

Example html code to be highlighted:
```html
<pre class="language-csharp"><code>public class HelloWorld { public static void Main() { System.Console.WriteLine("Hello, World!"); } }</code></pre>
```
Output from the /highlight endpoint:
```html
<pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span> <span class="token punctuation">{</span> <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">"Hello, World!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span></code></pre>
```

Remember to have your prismjs.css file included on your website.