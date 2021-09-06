import commentsApi from '../../servises/comments-api'
import { toast } from 'react-toastify'

const getAllPostComments = async id => {
	try {
		return await commentsApi.currentPostCommentsReq(id)
	} catch (error) {
		toast(`${error.response.data.error[0].message}`)
	}
}
const setCommentLike = async id => {
	try {
		const data = await commentsApi.commentLikeReq(id)
		return data
	} catch (error) {
		toast(`${error.response.data.error[0].message}`)
	}
}
const deleteComment = async id => {
	try {
		const data = await commentsApi.deleteCommentFromSelectedPostReq(id)
		return data
	} catch (error) {
		toast(`${error.response.data.error[0].message}`)
	}
}
const editComment = async (id, text) => {
	try {
		const data = await commentsApi.editSelectedPostCommentReq(id, text)
		return data
	} catch (error) {
		toast(`${error.response.data.error[0].message}`)
	}
}
const addComment = async (id, text) => {
	try {
		const data = await commentsApi.addCommentToSelectedPostReq(id, text)
		return data
	} catch (error) {
		toast(`${error.response.data.error[0].message}`)
	}
}
const getPostCmments = async id => {
	const NO_COMMENTS_PLACEHOLDER = [
		{
			_id: '1',
			commentedBy: '1',
			dateCreated: '1',
			followedCommentID: null,
			likes: [],
			postID: '1',
			text: 'No comments yet',
			__v: 1,
		},
	]
	try {
		const comments = await commentsApi.currentPostCommentsReq(id)
		if (comments.length) {
			return comments
		}
		return NO_COMMENTS_PLACEHOLDER
	} catch (error) {
		toast(`${error.response.data.error[0].message}`)
	}
}

const commentsOperations = {
	getPostCmments,
	setCommentLike,
	getAllPostComments,
	deleteComment,
	editComment,
	addComment,
}
export default commentsOperations
