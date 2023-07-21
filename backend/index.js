const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const classService = require("./services/classService");
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

  socket.on("chat-message-to-server", (message, roomId) => {
    io.to(roomId).emit("chat-message", message);
  });
});

// ############ Untouchable code ############

// ########## sample data for the home page ##########
const homePageData = {
  headline: "Mentee",
  subheadline: "A platform for mentors and mentees to connect",
  heroImage: "images/hero.png",
  getStartedButton: "Get Started",
  featureCards: [
    {
      image_src: "images/graph_1.png",
      title: "Learn",

      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum ultrices, nunc ipsum ultricies libero, vitae tincidunt nisl nunc vitae elit. ",
    },
    {
      image_src: "images/graph_1.png",
      title: "Connect",

      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum ultrices, nunc ipsum ultricies libero, vitae tincidunt nisl nunc vitae elit. ",
    },
    {
      image_src: "images/graph_1.png",
      title: "Grow",

      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum ultrices, nunc ipsum ultricies libero, vitae tincidunt nisl nunc vitae elit. ",
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
      position: "Senior Developer",
      num_of_stars: 2,
    },
    {
      image_src: "images/person_2.png",
      name: "Kyle  James",
      position: "Senior Engineer",
      num_of_stars: 4,
    },
    {
      image_src: "images/person_3.png",
      name: "Marry Smith",
      position: "Graphic Designer",
      num_of_stars: 3,
    },
  ],
};

// ########## sample data for the home page ##########

app.get("/", (req, res) => {
  res.json(homePageData);
});

app.post("/classes", async (req, res) => {
  try {
    // Extract class details from the request body
    // console.log(req.body);
    const { name, type, description, schedule, price } = req.body;

    // Combine the instructor ID with other class details
    const classDetails = {
      name,
      type,
      description,
      schedule,
      price,
      
    };

    // Call the createNewClass function from classService.js
    const newClass = await classService.createNewClass(classDetails);

    // Return the newly created class as the response
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new class" });
  }
});

app.get("/classes", async (req, res) => {
  try {
    const allClasses = await classService.getAllClasses();
    res.json(allClasses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch classes" });
  }
});



server.listen(5000, () => console.log("server is running on port 5000"));
