const commentFormHandler = async (event) => {
    event.preventDefault();

    // Collect text input from the comment form
    const content = document.querySelector('#comment').value.trim();
    const post_id = parseInt(document.querySelector('#post_id').value.trim());

    if (content && post_id) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, reload the page to view the updated comment.
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);