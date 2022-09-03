function submitData() {
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  let subject = document.getElementById("input-subject").value;
  let message = document.getElementById("input-message").value;

  // if(name == "" || email == "" || phone == ""){
  //    return alert("semua kolom wajib diisi")
  // }

  if (email == "") {
    return alert("name wajib diisi");
  } else if (email == "") {
    return alert("email wajib diisi");
  } else if (phone == "") {
    return alert("phone wajib diisi");
  } else if (subject == "") {
    return alert("subject wajib diisi");
  } else if (message == "") {
    return alert("message wajib diisi");
  }

  console.log(name);
  console.log(email);
  console.log(phone);
  console.log(subject);
  console.log(message);

  let emailReceiver = "budiaprisal@mail.com";

  // membuat tag a
  // <a href="mailto:samsul@mail.com.com?subject=hallo&body=Isi pesan">example</a>
  let a = document.createElement("a");
  a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hallo nama saya ${name}, ${message}, silahkan kontak saya dengan email ${email}, telp ${phone}`;
  a.click();

  document.addEventListener("DOMContentLoaded", function (e) {
    FormValidation.formValidation(document.getElementById("demoForm"), {
      fields: {},
      plugins: {
        startEndDate: new FormValidation.plugins.StartEndDate({
          format: "...",
          startDate: {
            field: "startDate",
            message: "The start date must be ealier than the end date",
          },
          endDate: {
            field: "endDate",
            message: "The end date must be later than the start date",
          },
        }),
      },
    });
  });
}
