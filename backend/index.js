const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const mongoose = require("mongoose")
// ############ Untouchable code ############
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const connectionString = `mongodb+srv://afmtoday:OlxwPFCF0rLMnA3e@cluster0.edrrjyh.mongodb.net/mentee?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.use(cors());

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, isTeacher, userId) => {
    console.log(
      "joining room",
      roomId,
      "my id is:",
      userId,
      "isTeacher:",
      isTeacher
    );
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId, isTeacher);
  });

  socket.on("disconnect", (userId) => {
    socket.emit("user-disconnected", userId);
  });

  socket.on("chat-message-to-server", (message, roomId) => {
    io.to(roomId).emit("chat-message", message);
  });
});

// ############ Untouchable code ############

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
  title: "Introduction to Physics",
  description: "An introductory lecture on the principles of physics",
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
  thumbnail: "images/course_2.jpg",
  instructor: {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    image_src: "images/person_2.png",
  },
  date: "2023-07-05",
  startTime: "2:00 PM",
  endTime: "3:30 PM",
  duration: 90,
  price: 89.9,
};

const lecture3 = {
  id: "3",
  title: "Introduction to Biology",
  description: "Explore the basics of biology in this introductory lecture",
  thumbnail: "images/course_3.jpg",
  instructor: {
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    image_src: "images/person_3.png",
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
    "Learn the basics of computer science in this introductory lecture",
  thumbnail: "images/course_4.jpg",
  instructor: {
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    image_src: "images/person_4.png",
  },
  date: "2023-07-15",
  startTime: "11:00 AM",
  endTime: "12:30 PM",
  duration: 90,
  price: 109.9,
};

const lecture5 = {
  id: "5",
  title: "Introduction to Mathematics",
  description:
    "Discover the beauty of mathematics in this introductory lecture",
  thumbnail: "images/course_5.jpg",
  instructor: {
    name: "Michael Brown",
    email: "michael.brown@example.com",
    image_src: "images/person_5.png",
  },
  date: "2023-07-20",
  startTime: "4:00 PM",
  endTime: "5:30 PM",
  duration: 90,
  price: 94.9,
};

const lecture6 = {
  id: "6",
  title: "Introduction to History",
  description:
    "Uncover the fascinating world of history in this introductory lecture",
  thumbnail: "images/course_6.jpg",
  instructor: {
    name: "Sophia Davis",
    email: "sophia.davis@example.com",
    image_src: "images/person_6.png",
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
  thumbnail: "images/course_7.jpg",
  instructor: {
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    image_src: "images/person_7.png",
  },
  date: "2023-07-30",
  startTime: "12:00 PM",
  endTime: "1:30 PM",
  duration: 90,
  price: 99.9,
};

const lecture8 = {
  id: "8",
  title: "Introduction to Literature",
  description: "Discover the world of literature in this introductory lecture",
  thumbnail: "images/course_8.jpg",
  instructor: {
    name: "Olivia Harris",
    email: "olivia.harris@example.com",
    image_src: "images/person_8.png",
  },
  date: "2023-08-05",
  startTime: "10:00 AM",
  endTime: "11:30 AM",
  duration: 90,
  price: 89.9,
};

const lecture9 = {
  id: "9",
  title: "Introduction to Economics",
  description: "Learn the basics of economics in this introductory lecture",
  thumbnail: "images/course_9.jpg",
  instructor: {
    name: "Matthew Anderson",
    email: "matthew.anderson@example.com",
    image_src: "images/person_9.png",
  },
  date: "2023-08-10",
  startTime: "9:00 AM",
  endTime: "10:30 AM",
  duration: 90,
  price: 79.9,
};

const lecture10 = {
  id: "10",
  title: "Introduction to Art",
  description: "Explore the world of art in this introductory lecture",
  thumbnail: "images/course_10.jpg",
  instructor: {
    name: "Ava Clark",
    email: "ava.clark@example.com",
    image_src: "images/person_10.png",
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
  lecture9,
  lecture10,
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
