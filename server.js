//nome: Vítor Bertuzzi Beltrami Turma: 2ºDS AMS
//fiz até o exercicio 5, pois tive muita dificuldade para fazer os outros
const { log } = require('console');
const http = require('http');
const { parse } = require('url');
const alunos = [{id: 1, nome: 'Joao', turma: 1, curso: 'ds'},
    {id: 2, nome: 'Pedro', turma: 1, curso: 'mec'},
    {id: 3, nome: 'Vitor', turma: 3, curso: 'adm'},
    {id: 4, nome: 'Enzo', turma: 3, curso: 'ds'},
    {id: 5, nome: 'Hugo', turma: 2, curso: 'logistica'}
];
const produtos = [{id:1, nome:"Arroz 2kg", categoria:"alimento", preco:12.0,},
{id:2, nome:"sabonete", categoria:"higiene", preco:5.0,},
{id:3, nome:"condicionador", categoria:"higiene", preco:10.0,},
{id:4, nome:"detergente", categoria:"higiene", preco:4.0,},
{id:5, nome:"prato", categoria:"cozinha", preco:20.0,},
];
const server = http.createServer((req, res)=&gt;{
    if(req.method === 'GET' &amp;&amp; req.url === '/'){
        res.writeHead(200,{'content-type': 'application/json'});
        res.end(JSON.stringify({mensagem: 'Bem vindo' }));
    }else if(req.method === 'GET' &amp;&amp; req.url === '/sobre'){
        res.writeHead(200,{'content-type': 'application/json'});
        res.end(JSON.stringify({mensagem: 'olá esse é o /sobre' }));
    }else if(req.method === 'GET' &amp;&amp; req.url === '/status'){
        res.writeHead(200,{'content-type': 'application/json'});
        res.end(JSON.stringify({mensagem: 'olá pode ver o status' }));
    }else if(req.method === 'GET' &amp;&amp; req.url.startsWith('/alunos/')){
        const id = Number(req.url.split("/")[2]);
        const alunoencontrado = alunos.find(aluno =&gt; aluno.id === id);
        if(alunoencontrado){
        res.writeHead(200,{'content-type': 'application/json'});
        res.end(JSON.stringify(alunoencontrado));
        }else{
            res.writeHead(404,{'content-type': 'application/json'});
        res.end(JSON.stringify("ERROR 404 aluno nao encontrado"));
        }
    }else if (req.method === 'GET' &amp;&amp; req.url === '/alunos'){
        res.writeHead(200,{'content-type': 'application/json'});
        res.end(JSON.stringify(alunos));
    } else if (req.method === 'GET' &amp;&amp; req.url.startsWith('/produtos')) {
        res.writeHead(200, { 'content-type': 'application/json' });
        const minhaurl = new URL(req.url, `http://${req.headers.host}`);
        const filtrarcategoria = minhaurl.searchParams.get('categoria');

        let Enviarprodutos = produtos; 

        if (filtrarcategoria) {
            Enviarprodutos = produtos.filter(produto =&gt; produto.categoria === filtrarcategoria);
        }

        res.end(JSON.stringify(Enviarprodutos));
    }else if (req.method === 'POST' &amp;&amp; req.url === '/alunos') {
        let body = '';

        req.on('data', chunk =&gt; {
            body += chunk.toString();   
        });
            
        req.on('end', () =&gt; {
            try {
                const novoAluno = JSON.parse(body);
                const ids = alunos.map(aluno =&gt; aluno.id);
                let novoId = 1;
                if(!novoAluno.nome || !novoAluno.turma){
                    res.writeHead(400,{'content-type': 'application/json'});
                    res.end(JSON.stringify({mensagem:"400 requisição não encontrada"}));
                     return;
                }else{
                    
                    }if(alunos.length === 0){ 
                        novoAluno.id = novoId;
                        alunos.push(novoAluno);

                    }else{
                        novoId = Math.max(...ids) + 1;
                        novoAluno.id = novoId;
                        alunos.push(novoAluno);                  
                    }
                    res.writeHead(201,{'content-type': 'application/json'});
                    res.end(JSON.stringify(novoAluno));
            } catch (error) {
               res.writeHead(400,{'content-type': 'application/json'});
              res.end(JSON.stringify({mensagem:"400 requisição não encontrada"}));
              return;
            }
             
        });
    }
});

server.listen(3000, () =&gt;{
    console.log('http://localhost:3000/')
});
