const fileInputs = document.querySelectorAll('[data-input="file"]');
const dropZone = document.querySelector('[data-dropzone]');
const fileLabelErrorText = document.querySelector('[data-input-error]');
const fileLabelPlaceholder = document.querySelector('[data-input-placeholder]');
const buttonsReset = document.querySelectorAll('[type="reset"]');

if (fileInputs.length) {
  const fileInput = document.querySelector('[data-input="file"]');
  const fileLabel = document.querySelector('[data-input="label"]');

  const updateFileLabel = (files) => {
    if (!files || files.length === 0) {
      fileLabel.textContent = fileLabelPlaceholder.dataset.inputPlaceholder;
      return;
    }

    const invalidFiles = Array.from(files).filter(file => !file.type.startsWith('image/'));

    if (invalidFiles.length > 0) {
      fileLabel.textContent = fileLabelErrorText.dataset.inputError;
      fileInput.value = '';
      return;
    }

    if (files.length === 1) {
      fileLabel.textContent = `${files.length} файл выбран`;
    } else if (files.length <= 4) {
      fileLabel.textContent = `${files.length} файла выбрано`;
    } else {
      fileLabel.textContent = `${files.length} файлов выбрано`;
    }

    dropZone.classList.remove('form-file--bg');
  }

  fileInput.addEventListener('change', () => updateFileLabel(fileInput.files));

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt =>
    dropZone.addEventListener(evt, e => e.preventDefault())
  );

  // Обработка drop
  dropZone.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      updateFileLabel(files);
    }
  });

  Array.from(buttonsReset).filter(btnReset =>
    btnReset.addEventListener('click', () => {
      fileLabel.textContent = fileLabelPlaceholder.dataset.inputPlaceholder;
      fileInput.value = '';
      dropZone.classList.add('form-file--bg');
    })
  )
}

const fileInputsWithImage = document.querySelectorAll('[data-input="file-download"]');

if (fileInputsWithImage.length) {
  fileInputsWithImage.forEach((fileInput, index) => {
    const wrappers = document.querySelectorAll('[data-input="file-download-wrapper"]');
    const labels = document.querySelectorAll('[data-input="file-download-label"]');
    const blocks = document.querySelectorAll('[data-input="file-download-block"]');
    const images = document.querySelectorAll('[data-input="file-download-img"]');
    const texts = document.querySelectorAll('[data-input="file-download-text"]');
    const btnsDelete = document.querySelectorAll('[data-input="file-download-delete"]');

    const updateFileLabelWithImage = (files) => {
        if (!files || files.length === 0) {
          labels[index].textContent = fileLabelPlaceholder.dataset.inputPlaceholder;
          return;
        }

        const invalidFiles = Array.from(files).filter(file => !file.type.startsWith('image/'));

        if (invalidFiles.length > 0) {
          labels[index].textContent = fileLabelErrorText.dataset.inputError;
          fileInput.value = '';
          return;
        }

        // URL для предпросмотра
        const imageURL = URL.createObjectURL(files[0]);

        blocks[index].classList.remove('d-none');
        images[index].src = imageURL;
        texts[index].textContent = files[0].name;
        wrappers[index].classList.add('d-none');

        images[index].onload = () => URL.revokeObjectURL(imageURL);
      }

    const clearFileLabelWithImage = () => {
        fileInput.value = '';
        labels[index].innerHTML = `<span class="form-file-2__action">Загрузить фото автомобиля</span>`;
        blocks[index].classList.add('d-none');
        images[index].src = '';
        texts[index].textContent = '';
        wrappers[index].classList.remove('d-none');
      }

    fileInput.addEventListener('change', () => updateFileLabelWithImage(fileInput.files));

    btnsDelete[index].addEventListener('click', () => {
      clearFileLabelWithImage();
    })

    Array.from(buttonsReset).filter(btnReset =>
      btnReset.addEventListener('click', () => {
        clearFileLabelWithImage();
      })
    )
  })
}
