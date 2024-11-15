import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'generate a course tutorial on following details with field of Course Name, Description, Along with Chapter Name, About, Duration, Category : "Programming", Topic: "Python" Difficulty Level: "Basic" Duration: "1 Hour" No of Chapters:5, in JSON format',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course_name": "Python Programming for Beginners",\n  "description": "This introductory course will guide you through the fundamentals of Python programming. You will learn basic syntax, data types, operators, control flow, functions, and more. By the end of this course, you will be able to write simple Python programs and understand the core concepts of this versatile language.",\n  "chapters": [\n    {\n      "chapter_name": "Introduction to Python",\n      "about": "This chapter introduces you to the world of Python programming, covering its history, applications, and its popularity in various domains. You will learn how to set up your programming environment and execute your first Python code.",\n      "duration": "15 minutes",\n      "category": "Programming"\n    },\n    {\n      "chapter_name": "Variables and Data Types",\n      "about": "This chapter dives into the basics of variables, how to assign values to them, and the different types of data Python handles, including numbers, strings, and Booleans.",\n      "duration": "20 minutes",\n      "category": "Programming"\n    },\n    {\n      "chapter_name": "Operators and Expressions",\n      "about": "This chapter covers various operators used in Python, including arithmetic, comparison, logical, and assignment operators. You\'ll learn how to build expressions and evaluate their results.",\n      "duration": "15 minutes",\n      "category": "Programming"\n    },\n    {\n      "chapter_name": "Control Flow Statements",\n      "about": "This chapter explores conditional statements (if, else, elif) and looping constructs (for, while) that allow you to control the flow of your program based on specific conditions.",\n      "duration": "20 minutes",\n      "category": "Programming"\n    },\n    {\n      "chapter_name": "Functions",\n      "about": "This chapter introduces the concept of functions, reusable blocks of code that perform specific tasks. You\'ll learn how to define functions, pass arguments, and return values.",\n      "duration": "10 minutes",\n      "category": "Programming"\n    }\n  ],\n  "topic": "Python",\n  "difficulty_level": "Basic",\n  "duration": "1 hour"\n}\n``` \n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("generate a course tutorial on following details with field of Course Name, Description, Along with Chapter Name, About, Duration, Category : \"Programming\", Topic: \"Python\" Difficulty Level: \"Basic\" Duration: \"1 Hour\" No of Chapters:5, in JSON format");
// console.log(result.response.text());

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in details on topic:Yoga ,Chapter: Cool Down and Relaxation , in JSON format with lsit of array with fiels as title,description in details, code Example(<precode> format) if applicable.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "title": "The Importance of Cool Down and Relaxation in Yoga",\n    "description": "Cool-down and relaxation are crucial components of a complete yoga practice. They help transition your body and mind from the heightened state of a practice to a calm and centered state. By incorporating these elements, you can maximize the benefits of your practice and promote overall well-being.",\n    "codeExample": ""\n  },\n  {\n    "title": "Why Cool Down?",\n    "description": "After an invigorating yoga session, your body is energized and your muscles are warmed up. A cool-down period allows your body to gradually return to a resting state. This helps to:\\n\\n* **Prevent muscle soreness:** By gradually decreasing your heart rate and lowering body temperature, you can reduce the risk of muscle stiffness and soreness.\\n* **Promote flexibility:** Gentle stretches help to increase flexibility and range of motion, improving overall mobility.\\n* **Reduce stress and anxiety:** Slow, deep breathing and relaxation techniques help to calm the nervous system and reduce stress hormones.\\n* **Improve circulation:** Cool-down poses and relaxation techniques help to improve blood flow and circulation, aiding in muscle recovery.",\n    "codeExample": ""\n  },\n  {\n    "title": "Cool Down Techniques",\n    "description": "Here are some common cool-down techniques used in yoga:",\n    "codeExample": ""\n  },\n  {\n    "title": "Gentle Stretching",\n    "description": "Perform gentle stretches that target the major muscle groups engaged in your practice. Hold each stretch for 30-60 seconds, breathing deeply and focusing on the sensations in your body. Examples include:",\n    "codeExample": ""\n  },\n  {\n    "title": "Forward Fold",\n    "description": "Standing with feet hip-width apart, bend forward from the hips, allowing your head to hang towards your feet. This stretch helps to release tension in the back, hamstrings, and calves.",\n    "codeExample": ""\n  },\n  {\n    "title": "Child\'s Pose",\n    "description": "Kneel on the mat with your knees wider than hip-width apart. Sit back on your heels and fold your torso forward, resting your forehead on the mat. This pose promotes relaxation and stretches the spine, hips, and shoulders.",\n    "codeExample": ""\n  },\n  {\n    "title": "Supported Child\'s Pose",\n    "description": "This variation of Child\'s Pose provides additional support for the spine and can be especially helpful for those with lower back pain. Place a pillow or bolster under your chest and forehead for added comfort.",\n    "codeExample": ""\n  },\n  {\n    "title": "Reclined Spinal Twist",\n    "description": "Lie on your back with your knees bent and feet flat on the floor. Gently draw your knees towards your chest, then drop your knees to one side, keeping your shoulders flat on the floor. This twist helps to release tension in the spine and back muscles.",\n    "codeExample": ""\n  },\n  {\n    "title": "Supported Legs Up the Wall",\n    "description": "Lie down on your back with your hips close to a wall. Lean your legs up the wall, allowing your feet to rest against the wall. This inversion helps to improve circulation and reduce stress. ",\n    "codeExample": ""\n  },\n  {\n    "title": "Relaxation Techniques",\n    "description": "After gentle stretching, incorporate relaxation techniques to calm the nervous system and promote a deep sense of peace. Here are some common techniques:",\n    "codeExample": ""\n  },\n  {\n    "title": "Deep Breathing",\n    "description": "Practice slow, deep breaths, focusing on the inhales and exhales.  This technique helps to regulate heart rate, reduce anxiety, and promote relaxation.",\n    "codeExample": ""\n  },\n  {\n    "title": "Body Scan Meditation",\n    "description": "Lie down comfortably and bring your attention to your body. Start at your toes and slowly scan your way up to your head, noticing any sensations or tension. Allow your mind to relax with each breath.",\n    "codeExample": ""\n  },\n  {\n    "title": "Savasana (Corpse Pose)",\n    "description": "Lie on your back with your arms by your sides and palms facing up. Close your eyes and allow your body to fully relax. This pose promotes deep relaxation and helps to integrate the benefits of your practice.",\n    "codeExample": ""\n  },\n  {\n    "title": "Benefits of Relaxation",\n    "description": "Regularly incorporating relaxation techniques into your yoga practice can lead to many benefits, including:",\n    "codeExample": ""\n  },\n  {\n    "title": "Reduced Stress and Anxiety",\n    "description": "Relaxation techniques help to calm the nervous system and reduce the production of stress hormones.",\n    "codeExample": ""\n  },\n  {\n    "title": "Improved Sleep Quality",\n    "description": "Relaxation techniques can help to prepare your body for sleep, promoting deeper and more restful sleep.",\n    "codeExample": ""\n  },\n  {\n    "title": "Enhanced Focus and Concentration",\n    "description": "Relaxation techniques can help to clear your mind and improve your ability to focus and concentrate.",\n    "codeExample": ""\n  },\n  {\n    "title": "Increased Emotional Well-being",\n    "description": "Regular relaxation practices can help to reduce feelings of anxiety, depression, and stress, promoting a sense of overall well-being.",\n    "codeExample": ""\n  },\n  {\n    "title": "Conclusion",\n    "description": "Cool-down and relaxation are essential parts of any yoga practice. By incorporating gentle stretches and relaxation techniques, you can maximize the benefits of your practice, promote physical and mental well-being, and leave your body and mind feeling balanced and rejuvenated.",\n    "codeExample": ""\n  }\n]\n```',
        },
      ],
    },
  ],
});
