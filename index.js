const express = require('express')
const app = express()

//mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//dotenv
require('dotenv').config()

 

const cors = require('cors');
const port = process.env.PORT || 5000;



//middleware
app.use(cors())
app.use(express.json())

 



//---------------------DB Start--------------------------------------

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.843endu.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        //....................code start...................

        //all collection
 
        const expenseCollection = client.db("bismillahTower").collection('expense');
        const addMoneyCollection = client.db("bismillahTower").collection('addMoney');
        const memberCollection = client.db("bismillahTower").collection('member');
        const usersCollection = client.db("bismillahTower").collection('users');
        const  noticeCollection = client.db("bismillahTower").collection('notice');
 

 

       ///////////// user related api //////////
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            //   console.log(newUser);
            const query = { email: newUser.email };
            const existingUser = await usersCollection.findOne(query);
            
            if (existingUser) {
                return res.send({ message: 'User already Exist' });
            }
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
        })
 

        //get all user
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
             res.send(result);
        })
                //delete specific user from dashboard
                app.delete('/users/:id', async (req, res) => {
                    const deletedId = req.params.id;
                    // console.log(deletedId);
                    const query = { _id: new ObjectId(deletedId) };
                    const result = await usersCollection.deleteOne(query);
                    res.send(result);
                })

       //update user role
       app.put('/users/role', async (req, res) => {
        const newData = req.body;
        // console.log(newData);
        const filter={_id:new ObjectId(newData.userId)}//get specific data
        const options={upsert:true}//if data exist
        //set data
        const updatedData={
            $set:{
                userRole:newData.updateUserRole
            }
        }
            // console.log(updatedData);
            const result=await usersCollection.updateOne(filter,updatedData,options)
            res.send(result);    

    })





        ///////////////////user api end/////////////


        ///////////////////expense/////////////

        app.post('/expense', async (req, res) => {
            const newExpense = req.body;
            //  console.log(addClass);
            const result = await expenseCollection.insertOne(newExpense);
            res.send(result);
        })
 

           
         app.get('/expense', async (req, res) => {
             const result = await expenseCollection.find().toArray();
             res.send(result);
         })


        ///////////////////notice start/////////////

        app.post('/notice', async (req, res) => {
            const newNotice = req.body;
            //  console.log(addClass);
            const result = await noticeCollection.insertOne(newNotice);
            res.send(result);
        })
 
         app.get('/notice', async (req, res) => {
             const result = await noticeCollection.find().toArray();
             res.send(result);
         })

                      //delete specific notice from dashboard
                app.delete('/notice/:id', async (req, res) => {
                    const deletedId = req.params.id;
                    console.log(deletedId);
                    const query = { _id: new ObjectId(deletedId) };
                    const result = await noticeCollection.deleteOne(query);
                    res.send(result);
                })

                app.put('/notice',async(req,res)=>{           
                    const updatedNotice=req.body;//get data from client side
                //  console.log(updatedNotice);

                 const filter={_id:new ObjectId(updatedNotice.id)}//get specific data
                 const options={upsert:true}//if data exist
                 //set data
                 const updatedData={
                     $set:{
                         status:updatedNotice.status
                     }
                 }
                     // console.log(updatedData);
                     const result=await noticeCollection.updateOne(filter,updatedData,options)
                     res.send(result);    

                    })

///////////////////notice end/////////////





        app.post('/addMoney', async (req, res) => {
            const newAddMoney = req.body;
            //  console.log(addClass);
            const result = await addMoneyCollection.insertOne(newAddMoney);
            res.send(result);
        })

        
                //get all user
                app.get('/addMoney', async (req, res) => {
                    const result = await addMoneyCollection.find().toArray();
                    res.send(result);
                })



        app.post('/contactInfo', async (req, res) => {
            const newMember = req.body;
            //  console.log(addClass);
            const result = await memberCollection.insertOne(newMember);
            res.send(result);
        })

            
                app.get('/contactInfo', async (req, res) => {
                    const result = await memberCollection.find().toArray();
                    res.send(result);
                })




                

 
 



        // //create a user
        // app.post('/users', async (req, res) => {
        //     const user = req.body;
        //     const query = { email: user.email };
        //     const existingUser = await usersCollection.findOne(query);
        //     if (existingUser) {
        //         return res.send({ message: 'User already Exist' });
        //     }
        //     const result = await usersCollection.insertOne(user);
        //     res.send(result);
        // })

        //         //get all user
        //         app.get('/users', async (req, res) => {
        //             const result = await usersCollection.find().toArray();
        //             res.send(result);
        //         })

        // // //get specific user cart product
        // app.get('/users/:email', async (req, res) => {
        //     const email = req.params.email;
        //     // console.log(email);
        
        //         if (!email) {
        //             res.send([]);
        //         }
        //         //find multiple document
        //         const query = { email: email };
        //         const result = await usersCollection.find(query).toArray();
        //         res.send(result);
            
        // })

 
//----------------------------------cart related api----------------------

        // add to cart collection
        // app.post('/carts', async (req, res) => {
        //     const addClass = req.body;
        //     //  console.log(addClass);

        //      const query = { classId: addClass.classId,studentEmail:addClass.studentEmail };
        //      const existingClass = await cartsCollection.findOne(query);
        //      if (existingClass) {
        //          return res.send({ message: 'Class already Exist' });
        //      }
        //     const result = await cartsCollection.insertOne(addClass);
        //     res.send(result);
        // })

        //     //get specific user selected classes 
        //     app.get('/carts', async (req, res) => {
        //         const email = req.query.email;
        //         // console.log( 'from cart ',email);

        //         if (!email) {
        //             res.send([]);
        //         }
        //             //find multiple document
        //             const query = { 
        //                 studentEmail: email
        //              };
        //             const result = await cartsCollection.find(query).toArray();
        //             res.send(result);
              
        //     })

 


 
 

        // //feedback update classes field
        // app.put('/classes/feedback/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const newStatus=req.body;
        //     // console.log(newStatus,id);
        //     const filter={_id:new ObjectId(id)}//get specific data
        //     const options={upsert:true}//if data exist

        //     //set data
        //     const updatedData={
        //         $set:{
        //             feedback:newStatus.feedback
        //         }
        //         }
        //         const result=await classesCollection.updateOne(filter,updatedData,options)
        //         res.send(result);    

        // })

 

 


 
        //  //update user role using patch
        // app.patch('/users/instructor/:id', async (req, res) => {
        //    const id=req.params.id;
        // //    console.log(id);
        //    const filter={_id: new ObjectId(id)};
        //    const updateUser={
        //     $set:{
        //         role:'instructor'
        //     }
        //    }
        // const result=await  usersCollection.updateOne(filter,updateUser);
        // res.send(result);  
        // })

        //         //delete specific user from dashboard
        //         app.delete('/users/admin/:id', async (req, res) => {
        //             const deletedId = req.params.id;
        //             const query = { _id: new ObjectId(deletedId) };
        //             const result = await usersCollection.deleteOne(query);
        //             res.send(result);
        //         })
        

//----------------------------------manage user related api   end----------------------

 

        //...........end code ................




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

//-------------------------------------------------------------




app.get('/', (req, res) => {
    res.send('BT is running')
})

app.listen(port, () => {
    console.log(`Running at port is ${port}`);
})

