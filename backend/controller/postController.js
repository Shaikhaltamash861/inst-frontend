const Post=require('../model/postModel');
const User=require('../model/userModel')
const express=require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router=express.Router();
const post=async(req,res)=>{
    
    const data={
        caption:req.body.caption,
        image:req.body.image,
        postedBy:req.body.id
    }
    try {
        
        const post = await Post(data);
                const p=await post.save()
        
        const user = await User.findById(req.body.id);
        user.posts.push(post._id);
        await user.save();
        res.status(201).json({
            success: true,
            post,
        });
    } catch (error) {
        console.log(error)
        res.status(200).json({success:false,
        error})
        
    }


    
    
}
// router.post('/post',upload.single('avatar'),post())
// Get all post
const getPost=async(req,res)=>{
    
    try {
        
        const response=await Post.find({
            postedBy:req.query.id
        });
        res.send(response)
    } catch (error) {
        res.status(201).json({message:error._message})
    }
}
// get all posts who followed by me
 const getPostMyFollowing=async(req,res)=>{

        
     
     try {
         const user=await User.findById({_id:req.body.id})
         const totalPosts = await Post.find({
            postedBy: {
                $in: user.following
            }
        }).select('_id')
const postId=totalPosts.map((post)=>post._id)
const result = await Post.aggregate([
    {
              $match: { _id: { $in:postId} }
            },
            {
                $lookup: {
                    from: 'users',
                    localField:'postedBy',
                    foreignField:'_id',
                    as: 'bucket'
                }
            }
        ]);
        return res.status(200).json({
            success: true,
            posts: result,
            totalPosts:postId.length
        });
        //  Main
        //  const followingUserId=users.following.map((userId)=>userId.toString())
        //  console.log(followingUserId)
        //  const result = await User.aggregate([
        //     {
        //       $match: { _id: { $in: users} }
        //     },
        //     {
        //       $lookup: {
        //         from: 'posts',
        //         localField:'_id',
        //         foreignField:'postedBy',
        //         as: 'bucket'
        //       }
        //     }
        //   ]);
        //   console.log(result.length)

        //   res.send(result)

        // const lpost=await Post.aggregate([
        //     {
        //         $match: { _id: { $in: followingUserIds } }
        //       },
        //     {
        //     $lookup:{
        //         from:'users',
        //         let:{ postId:'postedBy' },
        //         pipeline:[
                    
        //         ]
        //     }
        // }])
        
    } catch (error) {
         console.log(error)
    }
 }

// add comment to corresponds to post id
const addComment=async(req,res)=>{
    console.log(req.body)
    const post=await Post.findById({_id:req.body.postId})
    try {
        
        const setComment=post.comments.push({
            user:req.body.user,
              comment:req.body.comment
            })
            
           if(setComment){

               const respnse= await post.save();
               if(respnse){

                res.status(200).json({message:'comment added'})
               }
               
           } 
           res.status(201).json({message:'unable comment '})
        
    } catch (error) {
       console.log(error)   
       res.status(201).json({message:error._message})
    }
}
exports.post=post
exports.getPost=getPost
exports.addComment=addComment;
exports.getPostMyFollowing=getPostMyFollowing
