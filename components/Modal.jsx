import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { View, Modal as RNModal, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
const COLORS = { principal: '#7910ff' };

const Modal = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useImperativeHandle(ref, () => ({
    handleOpenModal: handleOpenModal,
    handleCloseModal: handleCloseModal,
  }));

  return (
    <RNModal
      visible={showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={handleCloseModal}
    >
      <TouchableOpacity style={styles.modalOverlay} onPress={handleCloseModal}>
        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
          {!props.isLoading ? (
            props.children
          ) : (
            <ActivityIndicator
              animating={props.isLoading}
              color={COLORS.principal}
              size="large"
              className="py-8"
            />
          )}
        </View>
      </TouchableOpacity>
    </RNModal>
  );
});

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});

export default Modal;
