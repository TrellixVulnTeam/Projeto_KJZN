Repositorio do Projeto:
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
             		  '@babel/preset-react']
	}
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
    	entry: path.resolve(__dirname,'src', 'index.jsx'), //local arquivo principal do app
        output: {
            path: path.resolve(__dirname, 'dist'),         //local de destino do codigo
            filename: 'bundle.js'
        },
        resolve     : {
            extensions:['.js','.jsx'],                     // permite entender as duas extenções
        },
        module:{                                     //configura comportamento quando importa cada tipo de arquivo
            rules:[                                 //array de regras
                {
                  test:/\.jsx$/,                    //expressão regular que verifica se é um arquivo js ou não
                  exclude:/node_modules/,           //exclui todos arquivos que estão na pasta node_module
                  use:'babel-loader'                // integração entre babel e webpack
                }
            ]
        }
    };

terminal:
yarn add babel-loader -D

yarn webpack

