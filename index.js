(function () {
  const inputs = document.querySelectorAll("#otp-input input");
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    input.addEventListener("input", function () {
      // handling normal input
      if (input.value.length == 1 && i + 1 < inputs.length) {
        inputs[i + 1].focus();
      }

      if (input.value.length > 1) {
        if (isNaN(input.value)) {
          input.value = "";
          return;
        }

        const chars = input.value.split("");

        for (let pos = 0; pos < chars.length; pos++) {
          if (pos + i >= inputs.length) break;

          let targetInput = inputs[pos + i];
          targetInput.value = chars[pos];
        }

        let focus_index = Math.min(inputs.length - 1, i + chars.length);
        inputs[focus_index].focus();
      }
    });

    // if a value is pasted, put each character to each of the next input

    input.addEventListener("keydown", function (e) {
      if (e.keyCode == 37) {
        if (i > 0) {
          e.preventDefault();
          inputs[i - 1].focus();
          inputs[i - 1].select();
        }
        return;
      }

      if (e.keyCode == 39) {
        if (i + 1 < inputs.length) {
          e.preventDefault();
          inputs[i + 1].focus();
          inputs[i + 1].select();
        }
        return;
      }

      if (e.keyCode == 8 && input.value == "" && i != 0) {
        for (let pos = i; pos < inputs.length - 1; pos++) {
          inputs[pos].value = inputs[pos + 1].value;
        }

        inputs[i - 1].value = "";
        inputs[i - 1].focus();
        return;
      }

      if(e.keyCode == 46 && i != inputs.length -1) {
        for(let pos = i; pos < inputs.length -1; pos++){
            inputs[pos].value = inputs[pos+1].value
        }

        inputs[inputs.length -1].value = '';
        e.preventDefault();
        return;
      }
    });
  }

  function updateInput() {
    let inputValue = Array.from(inputs).reduce(function (otp, input) {
        otp += (input.value.length) ? input.value : ' ';
        return otp;
    }, "")

    document.querySelector("input[name=otp]").value = inputValue;
  }
})();
