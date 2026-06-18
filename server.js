const { log } = require('console');
const http = require('http');
const alunos = [{id: 1, nome: 'Joao', turma: 1, curso: 'ds'},
    {id: 2, nome: 'Pedro', turma: 1, curso: 'mec'},
    {id: 3, nome: 'Vitor', turma: 3, curso: 'adm'},
    {id: 4, nome: 'Lauro', turma: 2, curso: 'ds'},
    {id: 5, nome: 'Hugo', turma: 2, curso: 'logistica'}
];
const produtos = [{id:1, nome:"Arroz 2kg", categoria:"alimento", preco:12.0,},
{id:2, nome:"sabonete", categoria:"higiene", preco:5.0,},
{id:3, nome:"condicionador", categoria:"higiene", preco:10.0,},
{id:4, nome:"detergente", categoria:"higiene", preco:4.0,},
{id:5, nome:"prato", categoria:"cozinha", preco:20.0,},
];
const server = http.createServer((req, res)=>{
    if(req.method === 'GET' && req.url === '/'){
        res.writeHead(200,{'content-type': 'application/json'});
        res.end(JSON.stringify({mensagem: 'Bem vindo' }));
    }else if(req.method === 'GET' && req.url === '/sobre'){
        res.writeHead(200,{'content-type': 'application/json'});
        res.end(JSON.stringify({mensagem: 'olá esse é o /sobre' }));
    }else if(req.method === 'GET' && req.url === '/status'){
        res.writeHead(200,{'content-type': 'application/json'});
        res.end(JSON.stringify({mensagem: 'olá pode ver o status' }));
    }else if(req.method === 'GET' && req.url.startsWith('/alunos/')){
        const id = Number(req.url.split("/")[2]);
        const alunoencontrado = alunos.find(aluno => aluno.id === id);
        if(alunoencontrado){
        res.writeHead(200,{'content-type': 'application/json'});
        res.end(JSON.stringify(alunoencontrado));
        }else{
            res.writeHead(404,{'content-type': 'application/json'});
        res.end(JSON.stringify("ERROR 404 aluno nao encontrado"));
        }
    }else if (req.method === 'GET' && req.url === '/alunos'){
        res.writeHead(200,{'content-type': 'application/json'});
        res.end(JSON.stringify(alunos));
    } else if (req.method === 'GET' && req.url.startsWith('/produtos')) {
        res.writeHead(200, { 'content-type': 'application/json' });
        const minhaurl = new URL(req.url, `http://${req.headers.host}`);
        const categoriaQueOUsuarioPediu = minhaurl.searchParams.get('categoria'); // Agora você pega a categoria corretamente

        let produtosParaEnviar = produtos; // Começa com todos os produtos

        // Se uma categoria foi pedida, vamos filtrar (isso ainda vamos detalhar depois)
        if (categoriaQueOUsuarioPediu) {
            // Por enquanto, vamos retornar todos os produtos mesmo se uma categoria for pedida,
            // para não quebrar o servidor. A lógica de filtro virá aqui depois.
            // produtosParaEnviar = produtos.filter(produto => produto.categoria === categoriaQueOUsuarioPediu);
        }

        res.end(JSON.stringify(produtosParaEnviar)); // Envia os produtos (todos por enquanto)
    }
    }
});


server.listen(3000, () =>{
    console.log('http://localhost:3000/')
});