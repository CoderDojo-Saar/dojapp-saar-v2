const IS_PRODUCTION = true;

const path = require("path");

const src = {
    js: path.join(__dirname, "src", "js"),
    pageJs: path.join(__dirname, "src", "js", "pages")
};

const pages = {
    "dates.page": path.join(src.pageJs, "dates", "dates.js"),
    "contact.page": path.join(src.pageJs, "contact", "contact.js")
};

const config = {
    entry: Object.assign({

    }, pages),
    output: {
        path: path.resolve(__dirname, "www", "dist"),
        filename: "[name].js",
        publicPath: "dist/"
    },
    plugins: [

    ],
    mode: IS_PRODUCTION ? "production" : "development",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', "sass-loader"]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"]
            }
        ]
    }
};

module.exports = config;
