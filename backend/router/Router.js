const express=require('express')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/',
limits: {  fileSize: 1048576, fieldSize:  25 * 1024 * 1024 } })

const router=express.Router();
const {signup,signin, getUserById, getUserByUserName, followUser, getFollowers, getFollowing, changeProfile}=require('../controller/userContriller');
const { post,getPost, addComment, getPostMyFollowing, whoCommented } = require('../controller/postController');

router.post('/signup',signup);
router.post('/signin',signin)
router.post('/post',upload.single('file'),post)
router.get('/posts',getPost)
router.post('/follow/user',followUser);
router.get('/user',getUserById);
router.post('/retrive/user',getUserByUserName);
router.post('/get/followers',getFollowers)
router.post('/get/following',getFollowing)
router.post('/change/profile',upload.single('file'),changeProfile)
router.post('/add/comment',addComment);
router.post('/get/posts/following',getPostMyFollowing)
router.post('/get/commented/user',whoCommented)
module.exports=router