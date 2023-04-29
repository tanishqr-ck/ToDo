const exp= require("express")
const bp= require("body-parser")
const date = require(__dirname+"/date.js")
const mongoose=require("mongoose")
const app= exp()
let id = 0;
let value = ""
// var items=["buy vegetables","See Doctor","Drink Milk"]
app.set('view engine','ejs')
app.use(bp.urlencoded({extended: true}))
app.use(exp.static("public"))

mongoose.connect("mongodb://localhost:27017/todolistDB")
const schema={

  itemName:String
}
const Item= mongoose.model("Item",schema)

//
// const item1=new Item({
//   itemName: "buy Food"
// })
// const item2=new Item({
//   itemName: "Water plants"
// })
// const item3=new Item({
//   itemName: "Go to library"
// })
// const defaultItems=[item1,item2,item3]


async function getItems(){

  const Items = await Item.find({});
  return Items;

}


app.get("/",(req,res)=>
{
let day = date();
getItems().then(function(FoundItems){
     // if(FoundItems.length==0)
     // {
     //
     //   Item.insertMany(defaultItems)
     //   res.redirect("/")
     // }
   res.render("list", {listTitle: day, newListItem:FoundItems, value:value});
 });
})


app.post("/",(req,res)=>
{
  var item=req.body.newItem;
  if(id!=0 && value!=""){
    Item.updateOne({_id:id},{"$set":{itemName: item}}).then(()=>{
      id = 0;
      value = ""
    })
  }else{
    if(item!="")
    {
      const new_item=new Item({
        itemName: item
      })
      new_item.save();
    }
  }
  res.redirect("/")
})


app.post("/delete",(req,res)=>{
const rem_id=req.body.clicked
const id = new mongoose.Types.ObjectId(rem_id);
Item.findByIdAndRemove(id).then(()=>{
  res.redirect("/");
})
})


app.post("/edit",(req,res)=>{
const { clicked } = req.body;
id = clicked
Item.findOne({ _id: clicked}).then((data)=>{
  value = data.itemName
})
res.redirect("/")
})


function Hello()
{
  console.log("hello")
}



app.listen(3000,()=>
{
  console.log("Server up and running.")
})
