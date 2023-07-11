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
        ]).sort({createdAt:-1});
        return res.status(200).json({
            success: true,
            posts: result,
            totalPosts:postId.length
        });
      
        
    } catch (error) {
        console.log(error)
    }
}
 const whoCommented=async(req,res)=>{
     console.log(req.body)
     const response =await Post.findById({_id:req.body.postId}).select('comments')
     
     const commentUser=response.comments.map((id)=>id.user)
     try {
         
         const result = await Post.aggregate([
             {
                  $match: { 'comments.user': { $in:commentUser} }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField:'comments.user',
                        foreignField:'_id',
                        as: 'bucket'
                    },
                },
                {
                    $addFields: {
                      comments: {
                        $map: {
                            input: "$comments",
                          as: "comment",
                          in: {
                            comment: "$$comment.comment",
                            userId: "$$comment.userId",
                            userDetail: { $arrayElemAt: ["$bucket", { $indexOfArray: ["$comments.user", "$$comment.user"] }] }
                          }
                        }
                      }
                    }
                  }
                  // {
                    //     $addFields: {
                        //       "comments.bucket": { $arrayElemAt: ["$bucket._id", 0] } // Store the user details within the comments object
                    //     }
                    //     ,
                    //   },
                    //   {
                        //     $group: {
                            //       _id: "$_id",
                            //       comments: { $push: "$bucket" }, // Group the comments back into an array
                            //       // Include other fields from the posts collection if needed
                    //     }
                    //   }
                    // },{  
                        //     $addFields: {
                            //         "comments.name": {
                //             $arrayElemAt:["$bucket.username",]
                //         }  // Field you want to add within the nestedField
                //       }
                // KAAM KIS CHEEZ HAI
                //    {

                    //        $set: {
                        //            bucket: { $arrayElemAt: ["$bucket.name", 0] }
                        //         }
                        //     }
                        
                        ,{
                            $project:{
                                
            
                        likes:0,
                        savedBy:0,
                        createdAt:0,
                        __v:0,
                        
                        'comments.userDetail.following':0,
                        'comments.userDetail.password':0,
                        'comments.userDetail.name':0,
                        'comments.userDetail.bio':0,
                        'comments.userDetail.posts':0,
                        'comments.userDetail.saved':0,
                        'comments.userDetail.followers':0,
                        'comments.userDetail.email':0,
                        'bucket':0
                        // 'bucket.following':0,
                        
                        // 'bucket.password':0,
                        // 'bucket.name':0,
                        // 'bucket.bio':0,
                        // 'bucket.posts':0,
                        // 'bucket.saved':0,
                        // 'bucket.followers':0,
                        // 'bucket.__v':0
                        
                    }
                }
            ])
            const post=result.find((post)=>post._id==req.body.postId)
            if(post){

                res.status(200).json({message:post,success:true})
            }
        } catch (error) {
            res.status(201).json({message:error,success:false})
           
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
exports.whoCommented=whoCommented
