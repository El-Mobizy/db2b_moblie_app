import React, { useRef } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import Modal from '../../components/Modal'; // Assurez-vous que le chemin vers le fichier Modal est correct

const ExamplePage = () => {
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.handleOpenModal();
  };

  const closeModal = () => {
    modalRef.current.handleCloseModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Exemple d'utilisation du composant Modal</Text>
        <Button title="Ouvrir le Modal" onPress={openModal} />
      </View>
      <Modal ref={modalRef}>
        <View style={styles.modalInnerContent}>
          <Text style={styles.modalTitle}>Ceci est le contenu du modal</Text>
          <Button title="Fermer le Modal" onPress={closeModal} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalInnerContent: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ExamplePage;
