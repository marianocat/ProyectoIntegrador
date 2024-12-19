var exampleModal = document.getElementById('modalDetalles')
exampleModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  // Extract info from data-bs-* attributes
  var nomProducto = button.getAttribute('data-bs-producto')
  var descProducto = button.getAttribute('data-bs-detalle')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  var modalTitle = exampleModal.querySelector('.modal-title')
  var modalBodyInput = exampleModal.querySelector('.modal-body p')

  modalTitle.textContent = nomProducto
  modalBodyInput.textContent = descProducto
})
