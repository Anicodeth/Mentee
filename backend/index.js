const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const mongoose = require("mongoose");
const Pusher = require("pusher");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const connectionString = `mongodb+srv://afmtoday:OlxwPFCF0rLMnA3e@cluster0.edrrjyh.mongodb.net/mentee?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// ################ New Pusher Setup ################

// Create a new instance of Pusher with your Pusher credentials
const pusher = new Pusher({
  appId: "1639415",
  key: "20d590a2a5e4500caac1",
  secret: "42ecf3e2bf8a165ddd94",
  cluster: "ap2",
  useTLS: true,
});

var users = [];
for (let i = 0; i < 50; i++) {
  users.push({
    name: "User " + i.toString(),
    email: "user " + i.toString() + "@example.com",
  });
}

app.post("/connection", (req, res) => {
  const { roomId, userId } = req.body;
  console.log("user connected", userId, roomId);
  pusher.trigger(roomId, "user-connected", { roomId: roomId, userId: userId });
});

app.post("/my-info", (req, res) => {
  const { token } = req.body;
  const randomIndex = Math.floor(Math.random() * 50);
  res.json(users[randomIndex]);
});

app.post("/chat", (req, res) => {
  const { roomId, message } = req.body;
  console.log("message:", message, roomId);
  pusher
    .trigger(roomId, "chat-message", message)
    .then(() => {
      console.log("it works");
    })
    .catch((err) => {
      console.log(err);
    });
});

// ############ New Pusher Setup ends ############

// ########## sample data ##########
const homePageData = {
  headline: "Mentee",
  subheadline:
    "Unlock Your Potential: Experience Live Online Learning and Mentorship",
  heroImage: "images/hero.png",
  getStartedButton: "Get Started",
  featureCards: [
    {
      image_src: "images/graph_1.png",
      title: "Experience",

      description:
        "Experience real-time mentorship like never before at Mentee.com. Engage in interactive discussions, receive personalized guidance, and learn directly from experienced mentors. Say goodbye to traditional learning barriers and join our vibrant community for transformative growth. Unlock your full potential today! ",
    },
    {
      image_src: "images/graph_1.png",
      title: "Interact",

      description:
        "Unleash your potential in an interactive learning environment at Mentee.com. Engage in real-time discussions, collaborative tools, and immersive experiences that make learning come alive. Say hello to active learning and join us today to embark on a transformative educational journey.",
    },
  ],

  socialLogos: [
    {
      image: "images/tg_logo.png",
      link: "https://t.me/mentee",
    },
    {
      image: "images/ig_logo.png",
      link: "https://instagram.com/mentee",
    },
    {
      image: "images/tw_logo.png",
      link: "https://twitter.com/mentee",
    },
  ],
  testimonials: [
    {
      image_src: "images/person_1.png",
      name: "Jason  Lee",
      testimonial_text:
        "My mentor was very helpful and knowledgeable. Moreover he was very patient and understanding.",
      num_of_stars: 2,
      position: "Senior Software Engineer",
    },
    {
      image_src: "images/person_2.png",
      name: "Kyle  James",
      testimonial_text:
        "I am very happy with my mentor. Our sessions were very productive and I learned a lot.",
      num_of_stars: 4,
      position: "CEO of ABC Company",
    },
    {
      image_src: "images/person_3.png",
      name: "Marry Smith",
      testimonial_text:
        "My experience with Mentee was very positive. I was able to find a mentor who was very helpful and knowledgeable.",
      num_of_stars: 3,
      position: "Graphic Designer",
    },
  ],
};

const sampleLectureData = {
  title: "Introduction to React JS",
  description:
    "Learn the basics of React JS and how to build a simple app with it. ",
  date: "2021-08-01",
  time: "12:00",
  duration: 60,
  thumbnail: "images/course_1.jpg",
  teacher: {
    name: "John Doe",
    position: "Senior Javascript Developer",
    image: "images/person_1.png",
  },
  mentees: [
    {
      name: "Marry Smith",
      image: "images/person_3.png",
    },
    {
      name: "Kyle James",

      image: "images/person_2.png",
    },
    {
      name: "Jason Lee",
      image: "images/person_1.png",
    },
  ],
};

const lecture1 = {
  id: "1",
  title: "Fundamentals of Machine Learning and Deep Learning",
  description:
    "Learn the basics of machine learning and deep learning in this introductory lecture",
  thumbnail: "/images/course_1.jpg",
  instructor: {
    name: "John Doe",
    email: "john.doe@example.com",
    image_src: "/images/person_1.png",
  },
  date: "2023-06-30",
  startTime: "10:00 AM",
  endTime: "11:30 AM",
  duration: 90,
  price: 99.9,
};

const lecture2 = {
  id: "2",
  title: "Introduction to Chemistry",
  description: "A comprehensive lecture on the fundamentals of chemistry",
  thumbnail: "https://files.indcareer.com/files/B.Ed%20Chemistry.jpg",
  instructor: {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    image_src: "/images/person_2.png",
  },
  date: "2023-07-05",
  startTime: "2:00 PM",
  endTime: "3:30 PM",
  duration: 90,
  price: 89.9,
};

const lecture3 = {
  id: "3",
  title: "Physics 101",
  description: "Explore the basics of physics in this introductory lecture",
  thumbnail:
    "https://www.everwallpaper.co.uk/cdn/shop/products/einstein-physics-mural-wallpaper-plain.jpg",
  instructor: {
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    image_src: "/images/person_3.png",
  },
  date: "2023-07-10",
  startTime: "9:00 AM",
  endTime: "10:30 AM",
  duration: 90,
  price: 79.9,
};

const lecture4 = {
  id: "4",
  title: "Introduction to Computer Science",
  description:
    "Have a deep understanding of computer science and its applications with this lecture",
  thumbnail:
    "https://e0.pxfuel.com/wallpapers/302/787/desktop-wallpaper-computer-science-background.jpg",
  instructor: {
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    image_src: "/images/person_1.png",
  },
  date: "2023-07-15",
  startTime: "11:00 AM",
  endTime: "12:30 PM",
  duration: 90,
  price: 109.9,
};

const lecture5 = {
  id: "5",
  title: "Advanced Mathematics",
  description:
    "Discover the beauty of mathematics in this advanced mathematics lecture",
  thumbnail: "https://i.pngimg.me/thumb/f/720/46462cd16b7a4d589aec.jpg",
  instructor: {
    name: "Michael Brown",
    email: "michael.brown@example.com",
    image_src: "/images/person_2.png",
  },
  date: "2023-07-20",
  startTime: "4:00 PM",
  endTime: "5:30 PM",
  duration: 90,
  price: 94.9,
};

const lecture6 = {
  id: "6",
  title: "Class VIII History",
  description:
    "Uncover the fascinating world of history in this introductory lecture",
  thumbnail:
    "https://digitalline.in/images/course/1632567180class8-history.jpg",
  instructor: {
    name: "Sophia Davis",
    email: "sophia.davis@example.com",
    image_src: "/images/person_3.png",
  },
  date: "2023-07-25",
  startTime: "3:00 PM",
  endTime: "4:30 PM",
  duration: 90,
  price: 79.9,
};

const lecture7 = {
  id: "7",
  title: "Introduction to Psychology",
  description:
    "Explore the human mind in this introductory lecture on psychology",
  thumbnail:
    "https://www.verywellmind.com/thmb/YVa2xBIFa7j8tiirG2IGIMXyk2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/psychology-schools-of-thought-2795247-nologo-86bcc1628ec84b23ac0c9ea3d0200f2b.png",
  instructor: {
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    image_src: "/images/person_1.png",
  },
  date: "2023-07-30",
  startTime: "12:00 PM",
  endTime: "1:30 PM",
  duration: 90,
  price: 99.9,
};

const lecture8 = {
  id: "10",
  title: "Basic Drawing lecture",
  description: "Explore the world of art in this lecture",
  thumbnail:
    "https://cdna.artstation.com/p/assets/images/images/028/239/990/large/gabriela-milanelli-67f1278f-57d6-4351-83bc-48c3410c2650.jpg",
  instructor: {
    name: "Ava Clark",
    email: "ava.clark@example.com",
    image_src: "/images/person_2.png",
  },
  date: "2023-08-15",
  startTime: "11:00 AM",
  endTime: "12:30 PM",
  duration: 90,
  price: 109.9,
};

const lectures = [
  lecture1,
  lecture2,
  lecture3,
  lecture4,
  lecture5,
  lecture6,
  lecture7,
  lecture8,
];

const profile1 = {
  name: "Marry Smith",
  email: "myemail@example.com",
  image_src: "/images/person_3.png",
};

// ########## sample data  ##########

app.get("/", (req, res) => {
  res.json(homePageData);
});
server.listen(5000, () => console.log("server is running on port 5000"));

app.get("/lecture/:id", (req, res) => {
  const id = req.params.id;
  res.json(lectures[id - 1]);
});

app.get("/profile", (req, res) => {
  res.json(profile1);
});

app.get("/lectures", (req, res) => {
  res.json(lectures);
});
