import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import apiRoutes from './routes/api.js';
import bodyParser from 'body-parser'
import model from './models/init.js'
import './lib/helpers.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form


app.use(cors({
  credentials:true,
  origin:["http://localhost:5173", "http://localhost:5174"]
}))
app.use(cookieParser())
app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
const port = 4002


// Swagger set up
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Network API',
      version: '1.0.0',
      description: 'Social Network API for JavaScript Renaissance',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Basic route
app.get('/', (req, res) => {
  res.redirect("/api")
});


app.get('/db/:table?', (req, res) => {
  const {table} = req.params
  const tables = ['users','session', 'posts','comments', 'likes', 'follows','requests', 'blocks']
  let columns = []
  let data = []

    if(table){
      data = model.prepare(`SELECT * FROM ${table}`).all()
      columns = model
                .prepare(`SELECT name FROM pragma_table_info('${table}' )`)
                .all()
                .map(e  => e['name'])
      
    }
  res.render('db', {tables, columns, data, table})  
})






app.get('/db/:table/:id', (req, res)=> {
  const {table, id} = req.params
  model.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id)
  res.redirect('/db/'+table)
})


// Routes

app.use('/', apiRoutes);

app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
