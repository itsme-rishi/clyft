import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function RegisterForm() {
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (text: string) => {
    // Allow only numeric values
    const numericText = text.replace(/[^0-9]/g, '');
    setPhone(numericText);
  };

  return (
    <View style={styles.container}>
      {/* Input & Continue Button right below Header */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="+91 Enter mobile number"
          keyboardType="numeric"
          value={phone}
          onChangeText={handlePhoneChange}
          maxLength={10} // Restrict to 10 digits
        />
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueText}>Continue &gt;</Text>
        </TouchableOpacity>
      </View>
    <View>

    </View>
      {/* Footer at the Bottom */}
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>By continuing, you agree to our</Text>
        <Text style={styles.terms}>Terms of Use & Privacy Policy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between', // Distributes content
    marginTop:60,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20, // Adjust to place below the header
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  continueButton: {
    marginTop: 20,
    backgroundColor: '#444',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    width: '100%',
  },
  footer: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  terms: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});