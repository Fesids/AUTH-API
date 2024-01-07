# AUTH-API

# AWS Endpoints

- registro de usuário : <br />
  envie uma requisição POST para : node-auth-api.fesids.com.br:8000/api/v1/auth/register <br />
  **** OBS: o referido ☝️ endpoint não se encontra mais disponível, AWS não está barato não...

  exemplo de JSON a ser enviado :
  > { <br />
    "nome": "exname", <br />
    "email": "ex@gmail.com", <br />
    "senha": "exemplo", <br />
    "telefones": [{"numero": "000000", "ddd": "12"}, {"numero": "000000", "ddd": "11"}]<br />
  }
  

- login de usuário : <br />
  envie uma requisição POST para : <br /> >node-auth-api.fesids.com.br:8000/api/v1/auth/login <br />
   **** OBS: o referido ☝️ endpoint não se encontra mais disponível, AWS não está barato não...
  

   exemplo de JSON a ser enviado :
    > {<br />
      "email": "ex@gmail.com",<br />
      "senha": "exemplo"<br />
    }


- recuperar detalhes do usuário : <br />
     envie uma requisição GET, contendo uma Header no seguinte formato {Authorization : "Bearer token"}   para : node-auth-api.fesids.com.br:8000/api/v1/auth
    **** OBS: o referido ☝️ endpoint não se encontra mais disponível, AWS não está barato não...


  
