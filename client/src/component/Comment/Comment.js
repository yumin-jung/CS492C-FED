/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from '../../component/SingleComment/SingleComment';
const { TextArea } = Input;

function Comments(props) {
    const user = useSelector(state => state.user.loginUser)

    const [Comment, setComment] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const userID = user.userID
    const postNo = props.postNo

    const handleClick = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            postID: postNo,
            writer: userID,
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result)
                    setComment([])
                } else {
                    alert('Failed to save Comment')
                }
        })
    }

    useEffect(()=>{

        const variables = {
            content: Comment
        }

        axios.post('/api/comment/getComments', variables)
        .then(response => {
            if (response.data.success) {
                console.log('response.data.comments',response.data.comments)
                setCommentLists(response.data.comments)
            } else {
                alert('Failed to get video Info')
            }
        })
      },[]);
    
    return (
        <div>
            <br />
            <p> replies</p>
            <hr />
            {/* Comment Lists  */}
            {CommentLists.map((comment) => (
                <SingleComment 
                    key={comment._id} 
                    comment={comment}
                    postNo={postNo}
                />
            ))}
            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>

        </div>
    )
}

export default Comments