import User from "../models/User";

export const register = async(req,res) =>{
    const {name ,email,password} = req.body;
    const hashed = await bcrypt.jas (password,10);
    try{
        const user = await User.create({name, email,password:hashed});
        res.status(201).json({message:"User Registered!"});
    }
    catch(err){
        res.status(400).json({error:"Email Already Exists!"});
    }
};

export const login = async(req,res) =>{
    const{email,password} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(404).json({message:"Email Not Found"});

    const isMatch = await bycrpt.compare(password,user.password);
    if (!isMatch) return res.status(401).json({error:"Invalid Credentials"});

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
    res.json({token, user});
};