const fileInputs = document.querySelectorAll('[data-input="file"]');

if (fileInputs.length) {
  const dropZone = document.querySelector('[data-dropzone]');
  const fileInput = document.querySelector('[data-input="file"]');
  const fileLabel = document.querySelector('[data-input="label"]');
  const fileLabelErrorText = document.querySelector('[data-input-error]');
  const fileLabelPlaceholder = document.querySelector('[data-input-placeholder]');

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

    // if (files.length === 1) {
    //   fileLabel.textContent = files[0].name.slice(0, 10) + '...';
    // } else if (files.length <= 3) {
    //   fileLabel.textContent = Array.from(files).map(f => f.name.slice(0, 10) + '...').join(', ');
    // } else {
    //   fileLabel.textContent = `${files.length} файлов выбрано`;
    // }

    fileLabel.textContent = `${files.length} файлов выбрано`;

    dropZone.classList.remove('form__file--bg');
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
}
