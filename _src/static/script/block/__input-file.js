const dropZone = document.querySelector('[data-input="wrapper"]');
const fileInput = document.querySelector('[data-input="file"]');
const fileLabel = document.querySelector('[data-input="label"]');

const updateFileLabel = (files) => {
  if (!files || files.length === 0) {
    fileLabel.textContent = 'Нажмите или перетащите файлы в эту область, чтобы загрузить';
    return;
  }

  if (files.length === 1) {
    fileLabel.textContent = files[0].name;
  } else if (files.length <= 3) {
    fileLabel.textContent = Array.from(files).map(f => f.name).join(', ');
  } else {
    fileLabel.textContent = `${files.length} файлов выбрано`;
  }
}

fileInput.addEventListener('change', () => updateFileLabel(fileInput.files));

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt =>
  dropZone.addEventListener(evt, e => e.preventDefault())
);

// Обработка drop
dropZone.addEventListener('drop', e => {
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files; // подставляем файлы в input
    updateFileLabel(files);
  }
});
