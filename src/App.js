import React, { useState } from "react";
import "./styles.css";
import domtoimage from "dom-to-image";
import Draggable from "react-draggable";
import { saveAs } from "file-saver";

export default function App() {
  const [background, setBackground] = useState(
    "https://scontent-dus1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/89965720_225876238556521_3322621401786096724_n.jpg?_nc_ht=scontent-dus1-1.cdninstagram.com&_nc_cat=101&_nc_ohc=m_chkpqtTF0AX-uHsek&oh=195ade0236c0c3ddc84657c98a9a2639&oe=5E9BDB45"
  );

  const [text, setText] = useState("Corona? <br/> Die Frisur sitzt!");
  const foo = () => {
    // domtoimage
    //   .toPng(document.querySelector("section.first"))
    //   .then(function(dataUrl) {
    //     var img = new Image();
    //     img.src = dataUrl;
    //     document.body.appendChild(img);
    //   })
    //   .catch(function(error) {
    //     console.error("oops, something went wrong!", error);
    //   });
    domtoimage
      .toBlob(document.querySelector("section.first"))
      .then(function(blob) {
        saveAs(blob, `jens-says-${text}.png`);
      });
  };
  const sectionStyle = {
    backgroundImage: `url(${background})`
  };
  const createMarkup = () => {
    return { __html: text };
  };
  return (
    <>
      <button onClick={foo}>Capture!</button>
      <section className="first" style={sectionStyle}>
        <Draggable
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[25, 25]}
          scale={1}
        >
          <blockquote
            className="speech bubble"
            dangerouslySetInnerHTML={createMarkup()}
          />
        </Draggable>
      </section>
      <input
        type="text"
        onChange={event => setText(event.target.value)}
        value={text}
        className="textInput"
      />
      <input
        type="text"
        onChange={event => setBackground(event.target.value)}
        value={background}
      />

      {/* <section>
        <blockquote className="whisper bubble">
          That’s the sound of my brain
        </blockquote>
      </section>
      <section>
        <blockquote className="electric bubble">
          Autobots,<span>Attack!</span>
        </blockquote>
      </section> */}
    </>
  );
}
