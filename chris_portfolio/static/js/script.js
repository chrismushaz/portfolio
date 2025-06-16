document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch("{% url 'contact' %}", {
        method: "POST",
        headers: {
            "X-CSRFToken": csrfToken,
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === 'success') {
            document.getElementById('contactForm').reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    });
});


const form = document.getElementById("contact"); // make sure your form has this ID
const statusDiv = document.getElementById("statusMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const formData = new FormData(form);

  fetch("{% url 'contact' %}", {
    method: "POST",
    body: formData,
    headers: {
      "X-CSRFToken": "{{ csrf_token }}",
    },
  })
  .then(response => response.json())
  .then(data => {
    let alertClass = data.status === "success" ? "alert-success" : "alert-danger";
    statusDiv.innerHTML = `
      <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
        ${data.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  })
  .catch(error => {
    statusDiv.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Something went wrong. Please try again.
      </div>
    `;
  });
});