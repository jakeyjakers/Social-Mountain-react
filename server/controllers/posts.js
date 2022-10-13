const { Post } = require(`../models/post`);
const { User } = require(`../models/user`);

module.exports = {
  getAllPosts: async (req, res) => {
    console.log(`get all  posts`);

    try {
      const posts = await Post.findAll({
        where: { privateStatus: false },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log("ERROR IN getAllPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },
  getCurrentUserPosts: async (req, res) => {
    console.log(`get curretn users`);

    const {userId} = req.params
    try {
      const posts = await Post.findAll({
        where: { userId: userId },
        include: [{ model: User, required: true, attributes: [`username`] }],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log(`ERROR in getCurrentUserPosts`);
      console.log(error);
      res.sendStatus(400);
    }
  },
  addPost: async (req, res) => {
    console.log(`add  posts`);

    try {
      const { title, content, status, userId } = req.body;
      await Post.create({
        title,
        content,
        privateStatus: status,
        userId,
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(`ERROR in addPost`, error);
      res.status(400).send(`Something went wrong with creating your post.`);
    }
  },
  editPost: async (req, res) => {
    console.log(`edit post`);

    try {
        const {status} = req.body
        const { id} = req.params
        await Post.update({privateStatus: status}, {where: {id: +id}})
        res.sendStatus(200)
    } catch(error) {
        console.log(`ERROR in editPost`);
        console.log(error)
      res.status(400).send(`Something went wrong with editing your post.`);
    }
  },
  deletePost: async (req, res) => {
    console.log(`delete  posts`);

    try {

        const {id} = req.params
        await Post.destroy({where: {id: +id}})
        res.sendStatus(200)
    } catch(error) {
        console.log(`ERROR in deletingPost`);
        console.log(error)
        res.status(400).send(`Something went wrong with deleting your post.`);
    }
  },
};
