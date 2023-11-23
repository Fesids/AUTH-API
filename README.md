# AUTH-API

# AWS Endpoints

- registro de usuário : <br />
  envie uma requisição POST para : 54.196.209.161:8000/api/v1/auth/register <br />

  exemplo de JSON a ser enviado :
  {
    "nome": "exname",
    "email": "ex@gmail.com",
    "senha": "exemplo",
    "telefones": [{"numero": "000000", "ddd": "12"}, {"numero": "000000", "ddd": "11"}]
  }
  

- login de usuário : <br />
  envie uma requisição POST para : 54.196.209.161:8000/api/v1/auth/login <br />

   exemplo de JSON a ser enviado :
    {
      "email": "ex@gmail.com",
      "senha": "exemplo"
    }


- recuperar detalhes do usuário : <br />
     envie uma requisição GET, contendo uma Header no seguinte formato {Authorization : "Bearer token"}   para : 54.196.209.161:8000/api/v1/auth

  
