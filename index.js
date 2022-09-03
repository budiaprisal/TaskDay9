const express = require("express");

const app = express();
const port = 8000;

app.set("view engine", "hbs"); // set view engine hbs
app.use("/assets", express.static(__dirname + "/assets")); // path folder assets
app.use(express.urlencoded({ extended: false }));

const db = require("./connection/db");

let isLogin = false;

app.get("/contact", function (request, response) {
  response.render("contact");
});

app.get("/", function (request, response) {
  // console.log(dataBlog);

  // let data = dataBlog.map(function(item){
  //     return {
  //         ...item,
  //         isLogin,
  //         postAt: getFullTime(item.postAt),
  //         duration: getDistanceTime(item.postAt)
  //     }
  // })

  db.connect(function (err, client, done) {
    if (err) throw err; // menampilkan error koneksi database

    client.query("SELECT * FROM tb_projects", function (err, result) {
      if (err) throw err; // menampilkan error dari query

      console.log(result.rows);
      let data = result.rows;

      let dataBlog = data.map(function (item) {
        return {
          ...item,
          start_date: convert(new Date(item.start_date)),
          end_date: convert(new Date(item.end_date)),
          post_at: getDistanceTime(item.post_at),
          duration: getime(new Date(item.start_date), new Date(item.end_date)),
          isLogin,
        };
      });
      console.log(dataBlog);
      response.render("home", { isLogin, dataBlog });
    });
  });
});

app.get("/blog-detail/:index", function (request, response) {
  response.render("blog-detail");
});

app.get("/add-project", function (request, response) {
  response.render("add-project");
});

app.post("/add-project", function (request, response) {});

app.get("/edit-blog/:index", function (request, response) {});

app.post("/edit-blog/:index", function (request, response) {});

app.get("/delete-blog/:index", function (request, response) {});

app.listen(port, function () {
  console.log(`server running on port ${port}`);
});
function getime(start, end) {
  let sdate = new Date(start);
  let esdate = new Date(end);
  let time = Math.abs(esdate - sdate);
  let days = Math.floor(time / (1000 * 60 * 60 * 24));
  return `${days} hari`;
}
function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

function getFullTime(time) {
  let month = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];

  let date = time.getDate();
  let monthIndex = time.getMonth();
  let year = time.getFullYear();

  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  // 12 Agustus 2022 09.04
  let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`;
  // console.log(fullTime);
  return fullTime;
}

function getDistanceTime(time) {
  let timeNow = new Date();
  let timePost = time;

  let distance = timeNow - timePost;
  // console.log(distance);

  let milisecond = 1000; // 1 detik 1000 milisecond
  let secondInHours = 3600; // 1 jam sama dengan 3600 detik
  let hoursInDay = 24; // 1 hari 24 jam

  let distanceDay = Math.floor(distance / (milisecond * secondInHours * hoursInDay));
  let distanceHours = Math.floor(distance / (milisecond * 60 * 60));
  let distanceMinutes = Math.floor(distance / (milisecond * 60));
  let distanceSeconds = Math.floor(distance / milisecond);

  if (distanceDay > 0) {
    return `${distanceDay} day ago`;
  } else if (distanceHours > 0) {
    return `${distanceHours} hours ago`;
  } else if (distanceMinutes > 0) {
    return `${distanceMinutes} minutes ago`;
  } else {
    return `${distanceSeconds} seconds ago`;
  }
}
