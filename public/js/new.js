const newFormHandler = async (event) => {
    event.preventDefault();

    // Collect text input from the comment form
    const title = document.querySelector('#title-new').value.trim();
    const content = document.querySelector('#content-new').value.trim();

    if (title && content) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, reload the page to view the updated comment.
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.new-form')
    .addEventListener('submit', newFormHandler);