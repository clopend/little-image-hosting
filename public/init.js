function upload(file) {
  const form = new FormData();
  form.append('file', file);
  axios
    .put('/upload', form)
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

window.onload = function () {
  document
    .querySelector('#input-file')
    .addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image')) {
        upload(file);
      }
    });
};
