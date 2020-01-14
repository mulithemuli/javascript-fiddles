(function() {
  // table code section updates by different approaches as described
  const show = () => {
    document.getElementById('result_jquery_val').innerText = $('#im_a_checkbox').val();
    document.getElementById('result_js_val').innerText = document.getElementById('im_a_checkbox').value;
    document.getElementById('result_jquery_checked').innerText = $('#im_a_checkbox').prop('checked');
    document.getElementById('result_js_checked').innerText = document.getElementById('im_a_checkbox').checked;
    document.getElementById('querystring').innerText = $('#form').serialize();
  };

  // add listener to checkbox to update table
  document.getElementById('im_a_checkbox').addEventListener('click', show);

  // button to check the checkbox
  document.getElementById('button_jquery_check').addEventListener('click', () => {
    $('#im_a_checkbox').prop('checked', true);
    show();
  });
  document.getElementById('button_js_check').addEventListener('click', () => {
    document.getElementById('im_a_checkbox').checked = true;
    show();
  });

  // button to uncheck check the checkbox
  document.getElementById('button_jquery_uncheck').addEventListener('click', () => {
    $('#im_a_checkbox').prop('checked', false);
    show();
  });
  document.getElementById('button_js_uncheck').addEventListener('click', () => {
    document.getElementById('im_a_checkbox').checked = false;
    show();
  });

  // button to update the value
  document.getElementById('update_value').addEventListener('click', () => {
    document.getElementById('im_a_checkbox').value = document.getElementById('checkbox_value').value;
    show();
  });

  // initially set the value in the input
  document.getElementById('checkbox_value').value = document.getElementById('im_a_checkbox').value;

  show();
}());
