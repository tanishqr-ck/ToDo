const exp= require("express")
const bp= require("body-parser")
// const date = require(__dirname+"/date.js")
const mongoose=require("mongoose")
const app= exp()
// var items=["buy vegetables","See Doctor","Drink Milk"]
app.set('view engine','ejs')
app.use(bp.urlencoded({extended: true}))
app.use(exp.static("public"))
mongoose.connect("mongodb://localhost:27017/todolistDB")
const schema={

  itemName:String
}
const Item= mongoose.model("Item",schema)
const item1=new Item({
  itemName: "buy Food"
})
const item2=new Item({
  itemName: "Water plants"
})
const item3=new Item({
  itemName: "Go to library"
})
const defaultItems=[item1,item2,item3]
Item.insertMany(defaultItems)
app.get("/",(req,res)=>
{
// let day = date();
   res.render("list",{
     listTitle: "Today",
     newListItem: items
   })
})
app.post("/",(req,res)=>
{
  var item=req.body.newItem;
  if(item!="")
  items.push(item)
  res.redirect("/")
})
app.listen(3000,()=>
{
  console.log("Server up and running.")
})
