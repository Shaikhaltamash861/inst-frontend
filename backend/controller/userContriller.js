
const User =require('../model/userModel')
const signup= async(req,res)=>{
    const {name,email,password,username}=req.body;
    const isAlready=await User.findOne({
        $or: [{ email }, { username },{name}]})
    if(isAlready)
    {
    
       res.status(200).json({message:"User is already registered",status:false})
    }
    const upload=await User(req.body);
    try {
        const save=await upload.save();

        if(!save){
        res.status(200).json({message:"user unable to save",status:false})
        }
        res.status(200).json({message:"user registerd successfully",status:true,user:save})

    } catch (error) {
        
        res.status(210).json({message:error._message,status:false})
    }
  
}

const signin=async(req,res)=>{
    const {email,username,password}=req.body;
   
        
    const user = await User.findOne({
        $or: [{ email:email }, { username:email }]
    });
    
    try {
        
        if(user){
           
            
            // const hasPass=await User.findOne({password:password});
            
            if(user.password===password){
                res.status(200).json({data:user,status:true,message:"successfuly loggIn"});
            }
            else{
                res.status(200).json({message:"wrong password",status:false})
            }
        }else{
            res.status(200).json({message:"username/email not found",status:false})
        }
        
    } catch (error) {
        console.log(error)

        res.status(210).json({error:"something went wrong",status:false})
        
    }    

}
const followUser = async (req, res) => {
    const userToFollow = await User.findById(req.body.yourId);
    const loggedInUser = await User.findById(req.body.myId);

    if (!userToFollow) {
        res.status(200).json({message:'NOT FOUND'});
    }

    if (loggedInUser.following.includes(userToFollow._id)) {

        const followingIndex = loggedInUser.following.indexOf(userToFollow._id);
        const followerIndex = userToFollow.followers.indexOf(loggedInUser._id);

        loggedInUser.following.splice(followingIndex, 1);
        userToFollow.followers.splice(followerIndex, 1);

        await loggedInUser.save();
        await userToFollow.save();

        return res.status(200).json({
            success: true,
            message: "User Unfollowed"
        });
    } else {
        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);
        await loggedInUser.save();
        await userToFollow.save();

        res.status(200).json({
            success: true,
            message: "User Followed",
        });
    }
};

const getFollowers=async(req,res)=>{
    try {
        const following=await User.find({
            following: req.body.id
        })
        if(following){
            res.status(200).json({message:following,status:true})
        }
           
    } catch (error) {
     res.status(201).json({message:error._message,status:false})
    }

   

}
const getFollowing=async(req,res)=>{
    try {
        const followers=await User.find({
            followers: req.body.id
        })
        if(followers){
         res.status(200).json({message:followers,status:true})
        }
           
    } catch (error) {
         res.status(201).json({message:error._message,status:false})
    }
}

const getUserById=async(req,res)=>{
    
    const {_id}=req.query;
    const user = await User.findById({_id});

    try {
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        // res.status(201).json(error._message)
    }
    
}
const getUserByUserName=async(req,res)=>{
    
    // const users=await User.findOne({
    //     $or: [{ email:req.body.query }, { username:req.body.query },{
    //         name:req.body.query
    //     }]
    // });
    if (req.body.query) {
        const users = await User.find({
            $or: [
                {
                    name: {
                        $regex: req.body.query,
                        $options: "i",
                    },
                },
                {
                    username: {
                        $regex: req.body.query,
                        $options: "i",
                    }
                }
            ]
        });

        res.status(200).json({
            success: true,
            users,
        });
    }
}
 const changeProfile=async(req,res)=>{
    const _id=req.body.id
    
    try {
        const upload=await User.findByIdAndUpdate({_id},{
            $set:{
                avatar:req.body.image
            }

        })
        
        res.status(200).json({message:upload,status:true})
    } catch (error) {
        res.status(201).json({message:error._message,status:false})
    }
 }
exports.signup=signup;
exports.signin=signin;
exports.getUserById=getUserById
exports.getUserByUserName=getUserByUserName
exports.followUser=followUser
exports.getFollowers=getFollowers;
exports.getFollowing=getFollowing
exports.changeProfile=changeProfile