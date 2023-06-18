import Blog from '../moduls/BlogPostModel.js'

export const PostBlog = async (req, res) => {
  const { title, dec, img, time, type } = req.body

  try {
    if (!title) {
      return res.status(400).json({ msg: 'Add Title' })
    }
    const obj = { title, dec, img, time, type }

    const postBlog = await Blog.create(obj)

    return res.status(201).json({ msg: 'Posted' })
  } catch (error) {
    return res.status(500).json({ msg: error })
  }
}

export const GetPosts = async (req, res) => {
  try {
    const blogPosts = await Blog.find({})
    if (!blogPosts) {
      return res.status(404).json({ msg: 'posts not found' })
    }
    blogPosts.reverse()
    return res.status(200).json({ blogPosts })
  } catch (error) {
    return res.status(500).json({ msg: 'ERROR' })
  }
}

export const EditPost = async (req, res) => {
  let { id } = req.params

  id = id.replace('\n', '')
  try {
    const post = await Blog.findById(id)
    if (!post) {
      return res.status(404).json({ msg: `${id} does not exist` })
    }
    await Blog.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    })
    return res.status(200).json({ msg: 'Post Edited Succsessfuily ' })
  } catch (error) {
    return res.stats(500).json({ msg: 'server error' })
  }
}

export const DeletePost = async (req, res) => {
  let { id } = req.params
  // console.log(id)
  id = id.replace('\n', '')
  try {
    const post = await Blog.findById(id)

    if (!post) {
      res.statsu(404).json({ msg: 'Id Not Found' })
    }

    await Blog.findOneAndDelete({ _id: id })
    return res.status(200).json({ msg: 'Post Has Been Deleted' })
  } catch (error) {
    return res.status(500).json({ msg: 'server error!' })
  }
}
