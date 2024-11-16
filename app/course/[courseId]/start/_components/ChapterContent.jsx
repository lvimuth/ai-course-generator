import React from "react";

function ChapterContent({ chapter, content }) {
  return (
    <div>
      <div className="p-10">
        <h2 className="font-medium text-2xl">{chapter?.chapter_name}</h2>
              <p className="text-gray-500">{chapter?.about}</p>
              
              {/* Video */}
      </div>
    </div>
  );
}

export default ChapterContent;
