document.addEventListener('DOMContentLoaded', () => {
    // remove any existing event listeners
    function removeEventListeners(element, type) {
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        return newElement;
    }

    // button to reveal post form
    let newPostButton = document.getElementById('newPostBtn');
    if (newPostButton) {
        newPostButton = removeEventListeners(newPostButton, 'click');
        newPostButton.addEventListener('click', (event) => {
            event.preventDefault();
            const updatePostForm = document.getElementById('updatePostForm');
            const postForm = document.getElementById('postForm');
            if (updatePostForm && postForm) {
                if (updatePostForm.style.display === 'block') {
                    updatePostForm.style.display = 'none';
                }
                postForm.style.display = 'block';
            }
        });
    }

    // post form submission
    let submitPostButton = document.getElementById('submitPostBtn');
    if (submitPostButton) {
        submitPostButton = removeEventListeners(submitPostButton, 'click');
        submitPostButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const title = document.getElementById('postTitle').value;
            const content = document.getElementById('postContent').value;

            try {
                const response = await fetch('/api/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, content }),
                });

                if (response.ok) {
                    alert('Post added successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to add post.');
                }
            } catch (error) {
                console.error('Error adding post:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // post deletion
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('deleteBtn')) {
            const postId = event.target.dataset.postId;

            try {
                const response = await fetch(`/api/post/${postId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    alert('Post deleted successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to delete post.');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('An error occurred. Please try again.');
            }
        }
    });

    // reveal update post form
    const updateButtons = document.querySelectorAll('.updateBtn');
    const updatePostForm = document.getElementById('updatePostForm');
    const updatedPostTitle = document.getElementById('updatedPostTitle');
    const updatedPostContent = document.getElementById('updatedPostContent');
    const submitUpdatedPostButton = document.getElementById('resubmitPostBtn');

    updateButtons.forEach(button => {
        button = removeEventListeners(button, 'click');
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const postId = button.dataset.postId;
            const title = button.dataset.title;
            const content = button.dataset.content;

            // set the data-post-id on the resubmit button
            submitUpdatedPostButton.setAttribute('data-post-id', postId);

            // pre-fill the form with the current post title and content
            updatedPostTitle.value = title;
            updatedPostContent.value = content;

            // show the update form
            updatePostForm.style.display = 'block';
        });
    });

    // submit updated post 
    if (submitUpdatedPostButton) {
        submitUpdatedPostButton = removeEventListeners(submitUpdatedPostButton, 'click');
        submitUpdatedPostButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const title = updatedPostTitle.value;
            const content = updatedPostContent.value;
            const postId = submitUpdatedPostButton.dataset.postId;

            try {
                const response = await fetch(`/api/post/${postId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, content }),
                });

                if (response.ok) {
                    alert('Post updated successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to update post.');
                }
            } catch (error) {
                console.error('Error updating post:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // button to reveal comment form
    let newCommentButton = document.getElementById('newCommentBtn');
    if (newCommentButton) {
        newCommentButton = removeEventListeners(newCommentButton, 'click');
        newCommentButton.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('commentForm').style.display = 'block';
        });
    }

    // comment form submission
    let submitCommentButton = document.getElementById('submitCommentBtn');
    if (submitCommentButton) {
        submitCommentButton = removeEventListeners(submitCommentButton, 'click');
        submitCommentButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const content = document.getElementById('commentContent').value;
            const postId = window.location.pathname.split('/').pop();

            try {
                const response = await fetch(`/api/comment/${postId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content }),
                });

                if (response.ok) {
                    alert('Comment added successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to add comment.');
                }
            } catch (error) {
                console.error('Error adding comment:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});