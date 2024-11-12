const apiKey = process.env.GEMINI_API_KEY;
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

export const GenerateCourseLayoout = model.startChat({
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
