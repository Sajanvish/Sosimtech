
const express = require('express')
const app = express()
const port = 5000
const yaml = require("js-yaml")
const fs =require('fs')
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")



const doc = yaml.load(fs.readFileSync('./db.yaml',"utf8"));
console.log(doc);
app.use(express.json())

// Swgger
const options={
    definition: {

        openapi: '3.0.0',

        info: {

            title: "REST API DOCS",

            version:'1.0.0',

            contact: {

                name: 'Mantu Pani',

                email: 'mantupani17@gmail.com'

            }

        },

        "basePath": "/",

        "host": "localhost:5000",

        components: {

            securitySchemas: {

                bearerAuth: {

                    type:'http',

                    scheme: 'bearer',

                    bearerForma: 'JWT'

                }

            }

        },

        security: [

            {

                bearerAuth:[]

            }

        ],

    }, 
    apis:["app.js"]    
}
const definationDoc= swaggerJsDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(definationDoc));
// Swagger

// Get All Data 
/**
 * @openapi
 * '/user':
 *   get:
 *     description: fethching user
    
 *     responses:
 *      200:
 *       description: Success


 *      409:
 *       description: Conflict
 *      400:
 *       description: Bad Request
 *      500:
 *       description: Internal Server Error
 *          
 */
app.get("/user",(req,res)=> res.send(doc))

// Create 

/**
 * @openapi
 * '/user':
 *   post:
 *     description: fethching user
    
 *     responses:
 *      200:
 *       description: Success


 *      409:
 *       description: Conflict
 *      400:
 *       description: Bad Request
 *      500:
 *       description: Internal Server Error
 *          
 */
app.post("/user",(req,res)=>{
    const user= req.body
    doc.push(user)

    res.send({
        message:"user created",
        data:doc
    })
}
)

// Delete

app.delete("/user:id" , (req,res)=>{
    const userId = req.params.id

    
})


// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`http://localhost ${port}!`))