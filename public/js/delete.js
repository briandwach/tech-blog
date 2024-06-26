const deleteFormHandler = async (event) => {
    event.preventDefault();

    // Collect post_id from hidden form value
    const post_id = document.querySelector('#post_id').value.trim();

    if (post_id) {
      // Send a DELETE request to the API endpoint
      const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        // If successful, redirect the page to confirm the post has been removed.
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.delete-form')
    .addEventListener('submit', deleteFormHandler);