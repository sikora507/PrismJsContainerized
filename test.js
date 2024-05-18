const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server.js'); // make sure this path is correct
const expect = chai.expect;

chai.use(chaiHttp);

describe('/POST highlight', () => {
  it('it should POST a chunk of HTML and return styled output', (done) => {
    const html = `<pre class="language-csharp"><code>public class HelloWorld { public static void Main() { System.Console.WriteLine("Hello, World!"); } }</code></pre>`;
    chai.request(server)
      .post('/highlight')
      .set('Content-Type', 'text/html')
      .send(html)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('<span class="token keyword">public</span>');
        done();
      });
  });
});