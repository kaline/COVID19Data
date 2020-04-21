const express = require('express')
const app = express()
app.set('title', 'COVID19DATA')

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.send('Data')
})
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });