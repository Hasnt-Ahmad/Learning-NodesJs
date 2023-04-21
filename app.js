
const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const User=require('./models/blog');

const app=express();

//connect to mongodb
const dbURI='mongodb+srv://netninja:test1234@cluster0.mcrnqbs.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI).then((result) =>{
    console.log('connected to db');
    app.listen(3000);
})
    .catch((error)=> console.log(error));


// register view Engine
app.set('view engine','ejs');

app.use(express.urlencoded( {extended: true}));

app.use(express.static('public'));

app.use(morgan('dev'));

app.get('/',(req,res)=>{

    res.redirect('/users');
});


app.get('/users', (req,res)=>{

    User.find().sort({createdAt:-1})
    .then((result)=>{
        
        res.render('index',{title:'All blogs', user:result})
    })
    .catch((error)=>{
        console.log(error);
    })
});

app.post('/', (req,res)=>{

    const user=new User(req.body);
    user.save()
    .then((result)=>{
        res.redirect('/users');
    })
    .catch((error)=>{
        console.log(error);
    })
    
});

app.get('/update/:id',(req,res)=>{
    
    const id=req.params.id;
    console.log("1st Id== "+id);
    User.findById(id)
    .then((result)=>{
        console.log("USer data == "+result);
        res.render('update', {title: 'Update', user:result});
    });
    
});

app.post('/update-user',(req,res)=>{
    const id=req.body.id;
    const user={
        _id:id,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        Age:req.body.Age
    }
    User.findOneAndUpdate({_id:id},user)
    .then((result)=>{
        res.redirect('/users');
    })
})

    

app.get('/add',(req,res)=>{

    res.render('add', {title: 'Add'});
});

app.get('/users/:id',(req,res)=>{
    const id=req.params.id;
    console.log("Delete User=="+ id);
    User.deleteOne({ _id:id })
    .then((result)=>{
        res.redirect('/users');
    })
    .catch((error)=>{
        console.log(error);
    })
})

app.get('/about',(req,res)=>{

    res.render('about', {title: 'About'});
});

app.get('/about-us',(req,res)=>{

    res.redirect('/about', {title: 'Home'});
});

app.use((req,res)=>{

    res.status(404).render('404',{title: '404'});
});