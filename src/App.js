import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const subpriseOptions = [
    "A blue ostrich eating melon",
    "A pineapple sunbathing on an island",
    "A matiss style shark on the telephone",
    "night view with meteor shower sky",
  ];
  const [value, setValue] = useState("");
  const [images, setImages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getImages = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
        }),
      };
      const Res = await fetch("http://localhost:8000/images", options);
      const data = await Res.json();
      console.log(data);
      setImages(data);
      setValue("");
    } catch (err) {
      console.log(err);
    }
  };

  const generateVariations = async () => {
    setImages(null);
    if (selectedImage === null) {
      setModalOpen(false);
      setError("Error! Must have an exisiting image");
      return;
    }
    try {
      const options = {
        method: "POST",
      };
      const Response = await fetch("http://localhost:8000/variations", options);
      const data = await Response.json();
      console.log(data);
      setImages(data);
      setError(null);
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setModalOpen(true);
    setSelectedImage(e.target.files[0]);
    // console.log(formData);
    try {
      const options = {
        method: "POST",
        body: formData,
      };
      console.log(formData);
      const response = await fetch("http://localhost:8000/upload", options);
      const data = await response.json();
      console.log("response:", data);
    } catch (err) {
      console.log(err);
    }
    e.target.value = null;
  };

  console.log(modalOpen);
  const superiseMe = () => {
    const random =
      subpriseOptions[Math.floor(Math.random() * subpriseOptions.length)];
    setValue(random);
  };
  return (
    <div className="App">
      <section className="sesrch-section">
        <p>
          Strart with a deatailed description
          <span className="suprise_section" onClick={superiseMe}>
            Suprise me
          </span>
        </p>
        <div className="input_container">
          <input
            placeholder="A sunflower  field"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={getImages}>Generator</button>
        </div>
        <p className="extra-info">
          Or,
          <span>
            <label htmlFor="files">upload an image </label>
            <input
              id="files"
              accept="images/*"
              type="file"
              onChange={uploadImage}
              hidden
            />
          </span>
          to edit.
        </p>

        {modalOpen && (
          <div className="modal_screen">
            <Modal
              setModalOpen={setModalOpen}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
              generateVariations={generateVariations}
            />
          </div>
        )}
      </section>
      <section className="image_section">
        {images &&
          images.map((ele) => (
            <img key={ele.url} src={ele.url} alt={`fetch_Image${value}`} />
          ))}
      </section>
    </div>
  );
}

export default App;
