const express = require('express');
const app = express();

app.use(express.static('./dist'));

app.set('port', 80);

app.listen(app.get('port'), () => {
  console.log(`Servidor ouvindo na porta ${app.get("port")}`);
});