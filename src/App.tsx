import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { fetchComments } from './feature/commentSlice'
import { fetchCurrentUser } from './feature/userSlice'
import CommentList from './components/CommentList'
import CommentForm from './components/CommentForm'

const App = () => {
  const dispatch = useAppDispatch()
  const { status: commentsStatus } = useAppSelector((state) => state.comments)
  const { status: userStatus } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (commentsStatus === 'idle') {
      dispatch(fetchComments())
    }
    if (userStatus === 'idle') {
      dispatch(fetchCurrentUser())
    }
  }, [dispatch, commentsStatus, userStatus])
  return (
    <div className='container'>
      <CommentList />
      <CommentForm />
    </div>
  )
}

export default App
