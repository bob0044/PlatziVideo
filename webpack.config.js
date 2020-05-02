const path = require('path'); //instanciamos path
const HtmlWebpackPlugin = require('html-webpack-plugin'); //instanciamos plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = { //obj = modulo a exportar. props = configuración de la exportación
  entry: './src/index.js', //la entrada es el archivo principal de nuestro src
  output: { //donde se guarda los archivos resultantes de la compilación
    path: path.resolve(__dirname, 'dist'), //ruta de la ubicación del archivo final
    filename: 'bundle.js', //nombre del archivo final
  },
  resolve: { //Resuelve las extensiones que usaremos en el proyecto
    extensions: ['.js', '.jsx'],
  },
  module: { //Modulo
    rules: [ //Reglas del proyecto. Definimos que archivos se compilarán
      {
        test: /\.(js|jsx)$/, //expresión regular que permite identidicar archivos de js y jsx
        exclude: /node_modules/, //archivo js o jsx que se excluirá en la compilación
        use: {
          loader: 'babel-loader', //definimos el loader a usar, previamente instalado
        },
      },
      {
        test: /\.html$/, //expresión regular que permite identidicar archivos de html
        use: {
          loader: 'html-loader', //definimos el loader a usar, previamente instalado
        },
      },
      {
        test: /\.(s*)css$/, //expresión regular que permite identidicar archivos SCSS y CSS
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [ //Plugins necesarios
    new HtmlWebpackPlugin({ //instanciamos para configurar el template principal HTML
      template: './public/index.html', //ubicación del template
      filename: './index.html', //definimos el filename que se obtendrá a partir del template luego de la compilación
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
  ],
};