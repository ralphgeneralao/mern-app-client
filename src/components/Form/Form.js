import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import {
  Button,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'

import { createPost, updatePost } from '../../actions/posts'
import useStyles from './styles'

const initialData = {
  creator: '',
  title: '',
  message: '',
  tags: '',
  selectedFile: ''
}

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState(initialData)
  const post = useSelector((state) => currentId ? state.posts.find(p => p._id === currentId) : null)
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    if(post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(currentId) {
      dispatch(updatePost(currentId, postData))
    } else {
      dispatch(createPost(postData))
    }
    clear()
  }

  const clear = () => {
    setCurrentId(null)
    setPostData(initialData)
  }

  const handleChange = e => {
    const { name, value } = e.target

    setPostData({
      ...postData,
      [name]: value
    })
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? 'Edit' : 'Create '} a Post
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={handleChange}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setPostData({
              ...postData,
              selectedFile: base64
            })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {currentId ? 'Update' : 'Submit'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form
