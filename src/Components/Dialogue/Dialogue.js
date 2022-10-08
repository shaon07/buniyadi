import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function Dialogue({ show, onHide, children }) {
  return (
    <Modal show={show} onHide={onHide} size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      className="rounded-none"
    >
      <Modal.Body className="p-0">
        {children}
      </Modal.Body>
    </Modal>
  )
}
