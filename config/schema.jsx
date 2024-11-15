import { boolean, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable("CourseList", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  level: varchar("level").notNull(),
  includeVideos: varchar("includeVideos").notNull().default("Yes"),
  courseOutput: json("courseOutput").notNull(),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName"),
  userProfileImage: varchar("userProfileImage"),
  courseBanner: varchar("courseBanner").default("/placeholder.png"),
  publish: boolean("publish").default(false),
});
