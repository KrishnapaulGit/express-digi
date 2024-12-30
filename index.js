import express from "express"

const app = express();

const port = 5000

// app.get('/',(req,res)=>{
//     res.send("Krishna Its Home Page");
// })
// app.get('/about',(req,res)=>{
//     res.send("Krishna Its About Page");
// })


app.use(express.json());

let course = [];
let nextId = 1;


// add new course
app.post('/courses',(req,res)=>{
    const {name,price} = req.body
    const newCourse = {id:nextId++,name,price}
    course.push(newCourse);
    res.status(200).send(newCourse);
})


// get all courses
app.get('/courses',(req,res)=>{
    res.status(200).send(course);
})



// find the course
app.get('/courses/:cour',(req,res)=>{
    const courseee = course.find(c => c.id === parseInt(req.params.cour))

    if(!courseee){
        res.status(404).send("Not Found")
    }else{
        res.status(200).send(courseee)
    }
})

// update

app.put('/courses/:cour',(req,res)=>{
    const courseee = course.find(c => c.id === parseInt(req.params.cour))
    if(!courseee){
        res.status(404).send("Not Found")
    }else{
        const {Newname,Newprice} = req.body
        courseee.name = Newname
        courseee.price = Newprice

        res.status(200).send("Updated")
    }

})

// delete

app.delete('/courses/:id',(req,res)=>{
    const courseeeIdx = course.findIndex(c => c.id === parseInt(req.params.id))
    if(courseeeIdx === -1){
        res.status(404).send("Not Found")
    }else{
        course.splice(courseeeIdx,1);
        

        res.status(200).send(`Updated Couse List: ${course}`)
    }
})


app.listen(port,()=>{
    console.log(`Server is running in port: ${port}....`)
})
