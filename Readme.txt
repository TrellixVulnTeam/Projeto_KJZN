Repositorio do Projeto:

Criando a estrutura do projeto

create folder src  , criar arquivo index.jsx
    import React from 'react';

    function App(){
         return <h1>Helloo World</h1>
    } 

create folder public criar arquivo index.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GitHub Explorer</title>
    </head>
    <body>
        <div id="root"></div> // usamos esse id para mostrar todos os componentes na tela dentro dessa div padrão react
        <script src="../dist/bundle.js"></script>
    </body>
    </html>

abra o terminal no visual code 
ctrl + ' 

crie uma pasta para projeto 
e entre na pasta usando  cd "nome da pasta"

exemplo:
C:\Users\ADMIN\Desktop\rocketseat\Ignite> cd Projeto

C:\Users\ADMIN\Desktop\rocketseat\Ignite\Projeto>


Criar arquivo json:
yarn init -y    "Cria arquivo json mostrando as dependencias e versões"

adicionar react

yarn add react  "biblioteca react com os modulos e dependencias react"

yarn react-dom  "biblioteca react dom permite que react se comunique com a arvore de elementos html que ele saiba como criar elementos em tela e deletar etc "

adicionando e configurando babel:

yarn add @babel/core @babel/cli @babel/preset-env -D  "babel ferramenta que recodifica codigo para que todo navegador entenda"

criar arquivo babel.config.js 

	module.exports={
    presets:['@babel/preset-env',
             ['@babel/preset-react',{
                    runtime:'automatic'
                }]
    ]
};
comando de execução babel:
yarn babel src/index.js --out-file dist/bundle.js  "escolha o arquivo a ser recodificado e o diretorio a ser criado para novo codigo"

o babel não entende html ou jsx , então inserimos novo recurso.

yarn add @babel/preset-react -D

agora o balbel consegue recodificar jsx para diversos navegadores entenderem.

o babel esta configurado.

Adicionando webpack

webpack permite configurar e ensinar a aplicação tratar cada tipo de arquivo,convertendo a tipos o que navegador entenda. 
ilustração

 instalar e configurar:

yarn add webpack webpack-cli -D

Cria arquivo de configuração webpack.config.js
	
	const path = require ('path')
	    
    module.exports={
        mode: 'development',
    	entry: path.resolve(__dirname,'src', 'index.jsx'),   //local arquivo principal do app
        output: {
            path: path.resolve(__dirname, 'dist'),           //local de destino do codigo
            filename: 'bundle.js'
        },
        resolve     : {
            extensions:['.js','.jsx'],                       // permite entender as duas extenções
        },
        module:{                                             //configura comportamento quando importa cada tipo de arquivo
            rules:[                                          //array de regras
                {
                  test:/\.jsx$/,                             //expressão regular que verifica se é um arquivo js ou não
                  exclude:/node_modules/,                    //exclui todos arquivos que estão na pasta node_module
                  use:'babel-loader'                         // integração entre babel e webpack
                }
            ]
        }
    };

terminal:
yarn add babel-loader -D

yarn webpack

yarn add html-webpack-plugin -D       permite injetar o bundle no arquivo html 

acrescentar no webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin')


plugins:[
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname,'public','index.html')
            })
        ],



arquivo esta atualmente assim.

    const path = require ('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
	    
    module.exports={
        mode: 'development',
    	entry: path.resolve(__dirname,'src', 'index.jsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        resolve     : {
            extensions:['.js','.jsx'],
        },
        plugins:[
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname,'public','index.html')
            })
        ],
        module:{
            rules:[
                {
                  test:/\.jsx$/,
                  exclude:/node_modules/,
                  use:'babel-loader'
                }
            ]
        }
    };


yarn add webpack-dev-server -D  //permite que webpack esxute as alterações e ja faça as modificações sem que nos precisemos ficar usando yarn webpack

acrescentar a config no webpackconfig

mais uma propriedade 

devServer:{
            contentBase: path.resolve(__dirname,'public')
        },

basta executar o comando

yarn webpack serve

agora toda alteração esta sendo atualizada automaticamente e fica disponivel no endereço http://localhost:8080/
webpack.config.js


    const path = require ('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
	    
    module.exports={
        mode: 'development',
    	entry: path.resolve(__dirname,'src', 'index.jsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        resolve     : {
            extensions:['.js','.jsx'],
        },
        devServer:{
            contentBase: path.resolve(__dirname,'public')
        },
        plugins:[
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname,'public','index.html')
            })
        ],
        module:{
            rules:[
                {
                  test:/\.jsx$/,
                  exclude:/node_modules/,
                  use:'babel-loader'
                }
            ]
        }
    };

agora sera configurado source maps para ajudar a mostrar o erro de forma correta.


const isDevelopement = process.env.NODE_ENV != 'production';    

    module.exports={
        mode: isDevelopement ? 'development': 'production',
        devtool: isDevelopement ? 'eval-source-map' : 'source-map',

configurando variaveis de ambiente

yarn add cross-env -D 

AGORA NO PACKGEjson vamos configurar os comandos scripts

"scripts" : {
    "dev": "webpack serve",
    "build" : "cross-env NODE_ENV= production webpack"
  },


  pronto 

  agora temos que configurar o projeto para entender arquivos css , 

  então no webpackconfig criaremos uma nova regra em rules

yarn add style-loader css-loader -D

  rules:[
                {
                  test:/\.jsx$/,
                  exclude:/node_modules/,
                  use:'babel-loader'
                },
                {                                              //essa é a nova regra
                    test:/\.css$/,
                    exclude:/node_modules/,
                    use:['style-loader' ,'css-loarder'],
                 }
            ]

sendo assim podemos importar arquivos css serão entendidos e recodificados.

agora configuraremos o Sass um pré-processador de css conseguindo ter funcionabilidades a mais no css.

yarn add sass-loader -D

yarn add node-sass -D

atualize o arquivo webpack.config.js
subistitua essa configuração pela existente
                {                                              
                    test:/\.scss$/,
                    exclude:/node_modules/,
                    use:['style-loader' ,'css-loader','sass-loader'],
                }