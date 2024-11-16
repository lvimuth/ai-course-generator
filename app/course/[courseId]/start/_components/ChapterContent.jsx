import React from "react";
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  return (
    <div>
      <div className="p-10">
        <h2 className="font-medium text-2xl">{chapter?.chapter_name}</h2>
        <p className="text-gray-500">{chapter?.about}</p>

        {/* Video */}
        <div className="flex justify-center my-6">
          <YouTube videoId={content?.videoId} opts={opts} />
        </div>
        <div>
          {content?.content?.map((item, index) => (
            <div className="p-5 bg-gray-50 mb-3 rounded-lg">
              <h2 className="font-medium text-lg">{item.title}</h2>
              <p className="whitespace-pre-wrap">{item.description}</p>
              {item.codeExample && (
                <div className="p-4 bg-black mt-3 rounded-md text-white">
                  <pre>
                    <code>{item.codeExample}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChapterContent;
