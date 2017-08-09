module.exports = {
      entry: './js/game.js',
      devtool: '#eval-source-map',
      output: {
        filename: './public/javascripts/game.js'
      },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules|bower/,
                query: {
                    presets: [
                        'es2016',
                        [ 'es2015', { modules: false } ],
                        'stage-0',
                        'react',
                    ],
                    // plugins: ['babel-plugin-add-module-exports', 'transform-decorators-legacy'],
                },
            },
        ]
      },
    devServer: {
          contentBase: './',
          compress: true,
          port: 9000
    }
};
