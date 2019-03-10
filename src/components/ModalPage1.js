import React from 'react';
import Modal from 'react-modal-es'
// eslint-disable-next-line
import { openModal, closeModal, closeAllModal } from './modal'

export default class ModalPage1 extends React.Component {
  onOpenModal = () => {
    openModal('modal1')
    openModal('modal2')
  }
  render() {
    return (
      <div>
        <Modal
        name='myModal'
        title='Modal Title'
        zIndex={1}
        className='your-classname'
        maxWidth='600px'
        overlayColor='rgba(0, 0, 0, 0.7)'
        center={false}
        closeOverlayDisabled={false}
        didOpen={() => null}
        willUnmount={() => null}
        willClose={() => null}
        >Content 1</Modal>
        <Modal name='modal2' title='Title Modal 2' zIndex={2}>Content 2</Modal>
        <button onClick={this.onOpenModal}>Open Modal</button>
      </div>
    )
  }
}