import React from "react";
import { X } from "lucide-react";

const ImagePreviewModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="coco-dashboard-image-modal-overlay" onClick={onClose}>
      <div
        className="coco-dashboard-image-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="coco-dashboard-image-modal-close"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <img
          src={image.preview || image.url || "/placeholder.svg"}
          alt={image.name || "Preview"}
          className="coco-dashboard-image-modal-img"
        />
        {image.name && (
          <div className="coco-dashboard-image-modal-info">
            <h4>{image.name}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreviewModal;