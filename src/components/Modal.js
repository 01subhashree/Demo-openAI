import React, { useRef, useState } from "react";

function Modal({
  setModalOpen,
  setSelectedImage,
  selectedImage,
  generateVariations,
}) {
  const [error, setError] = useState(null);
  const ref = useRef(null);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  console.log("selectedImage", selectedImage);

  const checkSize = () => {
    console.log(ref.current);
    if (ref.current.width == 256 && ref.current.height == 256) {
      generateVariations();
    } else {
      setError("Error: Choose 256x256 image");
    }
  };

  console.log("error", error);
  return (
    <div className="modal">
      <div onClick={closeModal} className="cross">
        ✘
      </div>

      <div className="img-container">
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="modal_image"
            ref={ref}
          />
        )}
      </div>
      <p>{error || "* Image must be 256 x 256"}</p>
      {!error && <button onClick={checkSize}>Generate</button>}
      {error && <button onClick={closeModal}>Close this and try again</button>}
    </div>
  );
}

export default Modal;
