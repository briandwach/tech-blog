const updateFormHandler = async (event) => {
    event.preventDefault();

    // Collect text input from the update form
    const title = document.querySelector('#title-update').value.trim();
    const content = document.querySelector('#content-update').value.trim();
    const post_id = document.querySelector('#post_id').value.trim();

    if (title && content && post_id) {
      // Send a PUT request to the API endpoint
      const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the page to view the updated post in the dashboard.
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.update-form')
    .addEventListener('submit', updateFormHandler);