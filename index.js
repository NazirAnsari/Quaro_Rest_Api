const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const methodOverride = require('method-override')
const {v4: uuidv4} = require('uuid')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.set("views engine","ejs")
app.set("views",path.join(__dirname,"views")) //views folder

app.use(express.static(path.join(__dirname,"public")))

app.use(methodOverride("_method"))

let posts =[
    {   id:uuidv4(),
        username:'apnaCollege',
        content:"I love Coding!"
    },
    {
        id:uuidv4(),
        username:'Nazir',
        content:"Learning is Important"
    },
    {
        id:uuidv4(),
        username:'rasik',
        content:"I love Maths!"
    }
]


app.get('/posts',(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get('/posts/new',(req,res)=>{
    res.render('new.ejs')
})

app.post('/posts',(req,res)=>{
    let{username,content} = req.body
    let id = uuidv4()
    posts.push({id ,username,content})
    res.redirect("/posts") //bydefault yeh get request pe redirect krta hai 
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>p.id ===id)
    res.render("show.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>p.id ===id)
    post.content = newContent
    res.redirect('/posts')
})


app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>p.id ===id)
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=>p.id !==id)
    res.redirect("/posts")
})
app.listen(port,()=>{
    console.log(`App is litening on port ${port}`)
})