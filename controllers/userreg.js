export const handlereg=(req,res,db,bcrypt)=>{
    const {username,mail,password,phone,houseno,area,city,locality_pin_code}=req.body;
  // const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password ,10);
  if(!mail || !password || !username || !phone || !houseno || !area || !city || !locality_pin_code ){
    return res.status(400).json(" havent filled form correctly");
  }

  const user_sql = `
  INSERT INTO user 
  (
    mail,
    password,
    username,
    phone,
    houseno,
    area,
    city,
    locality_pin_code 
    )
  
  VALUES ( 
    '${mail}',
    '${hash}',
    '${username}',
    '${phone}',
    '${houseno}',
    '${area}',
    '${city}',
    '${locality_pin_code}'
  );
  `
 

 const loacality_sql=`
 INSERT INTO locality
 (pin_code,
  loc_name)
  
  VALUES(
    '${locality_pin_code}',
    '${area}'
 );
  `

  const getuser_sql=`
  select * from user where mail=${mail}
  `


db.query(loacality_sql, (err, result) =>{
  if(err){return ;}
   console.log(" new loaclity added");
});

db.query(user_sql, (err, result)=> {
 if(err){   res.json(" user already availiable"); return ;}

   
  db.query(getuser_sql,(err,user)=>{
    if(err)throw err;
    res.json(user[0])
    console.log(user[0])
  })
 
 
 
});


}