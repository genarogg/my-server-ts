const viewEngine = (app: any) => {
    app.set('view engine', 'jsx');
    app.set("views", path.join(__dirname, "src/views"))
    app.engine('jsx', require('express-react-views').createEngine());

}

export default viewEngine;