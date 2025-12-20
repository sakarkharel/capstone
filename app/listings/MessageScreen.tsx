// // app/listings/MessageScreen.tsx

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const MessageScreen = ({ route, navigation }) => {
//   const { listingId, ownerId, userId } = route.params; // Get listing details and user info
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   // Load messages from AsyncStorage when the screen is mounted
//   useEffect(() => {
//     const loadMessages = async () => {
//       const storedMessages = await AsyncStorage.getItem(`messages_${listingId}`);
//       if (storedMessages) {
//         setMessages(JSON.parse(storedMessages));
//       }
//     };
//     loadMessages();
//   }, [listingId]);

//   // Send a message
//   const sendMessage = async () => {
//     if (!message) return Alert.alert('Error', 'Message cannot be empty.');

//     const newMessage = {
//       senderId: userId,
//       receiverId: ownerId,
//       message,
//       timestamp: new Date().toISOString(),
//     };

//     // Update the messages state and save to AsyncStorage
//     const updatedMessages = [...messages, newMessage];
//     setMessages(updatedMessages);
//     await AsyncStorage.setItem(`messages_${listingId}`, JSON.stringify(updatedMessages));

//     setMessage(''); // Clear message input
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={item.senderId === userId ? styles.myMessage : styles.otherMessage}>
//             <Text>{item.message}</Text>
//             <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
//           </View>
//         )}
//       />
//       <TextInput
//         placeholder="Type your message..."
//         value={message}
//         onChangeText={setMessage}
//         style={styles.input}
//       />
//       <Button title="Send" onPress={sendMessage} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   myMessage: {
//     backgroundColor: '#d1f7d1',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//   },
//   otherMessage: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignSelf: 'flex-end',
//   },
//   timestamp: {
//     fontSize: 10,
//     color: '#888',
//   },
// });

// export default MessageScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const MessageScreen = ({ route, navigation }) => {
//   const { listingId, ownerId, userId } = route.params; // Get listing details and user info

//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   // Load messages from AsyncStorage when the screen is mounted
//   useEffect(() => {
//     const loadMessages = async () => {
//       const storedMessages = await AsyncStorage.getItem(`messages_${listingId}`);
//       if (storedMessages) {
//         setMessages(JSON.parse(storedMessages));
//       } else {
//         console.log("No messages found for this listing.");
//       }
//     };
//     loadMessages();
//   }, [listingId]);

//   // Send a message
//   const sendMessage = async () => {
//     if (!message) return Alert.alert('Error', 'Message cannot be empty.');

//     const newMessage = {
//       senderId: userId,
//       receiverId: ownerId,
//       message,
//       timestamp: new Date().toISOString(),
//     };

//     // Update the messages state and save to AsyncStorage
//     const updatedMessages = [...messages, newMessage];
//     setMessages(updatedMessages);
//     await AsyncStorage.setItem(`messages_${listingId}`, JSON.stringify(updatedMessages));

//     setMessage(''); // Clear message input
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={item.senderId === userId ? styles.myMessage : styles.otherMessage}>
//             <Text>{item.message}</Text>
//             <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
//           </View>
//         )}
//       />
//       <TextInput
//         placeholder="Type your message..."
//         value={message}
//         onChangeText={setMessage}
//         style={styles.input}
//       />
//       <Button title="Send" onPress={sendMessage} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   myMessage: {
//     backgroundColor: '#d1f7d1',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//   },
//   otherMessage: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignSelf: 'flex-end',
//   },
//   timestamp: {
//     fontSize: 10,
//     color: '#888',
//   },
// });

// export default MessageScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const MessageScreen = ({ route, navigation }) => {
//   const { listingId, ownerId, userId } = route.query; // Access query params

//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   // Load messages from AsyncStorage when the screen is mounted
//   useEffect(() => {
//     const loadMessages = async () => {
//       const storedMessages = await AsyncStorage.getItem(`messages_${listingId}`);
//       if (storedMessages) {
//         setMessages(JSON.parse(storedMessages));
//       } else {
//         console.log("No messages found for this listing.");
//       }
//     };
//     loadMessages();
//   }, [listingId]);

//   // Send a message
//   const sendMessage = async () => {
//     if (!message) return Alert.alert('Error', 'Message cannot be empty.');

//     const newMessage = {
//       senderId: userId,
//       receiverId: ownerId,
//       message,
//       timestamp: new Date().toISOString(),
//     };

//     // Update the messages state and save to AsyncStorage
//     const updatedMessages = [...messages, newMessage];
//     setMessages(updatedMessages);
//     await AsyncStorage.setItem(`messages_${listingId}`, JSON.stringify(updatedMessages));

//     setMessage(''); // Clear message input
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={item.senderId === userId ? styles.myMessage : styles.otherMessage}>
//             <Text>{item.message}</Text>
//             <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
//           </View>
//         )}
//       />
//       <TextInput
//         placeholder="Type your message..."
//         value={message}
//         onChangeText={setMessage}
//         style={styles.input}
//       />
//       <Button title="Send" onPress={sendMessage} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   myMessage: {
//     backgroundColor: '#d1f7d1',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//   },
//   otherMessage: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignSelf: 'flex-end',
//   },
//   timestamp: {
//     fontSize: 10,
//     color: '#888',
//   },
// });

// export default MessageScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const MessageScreen = ({ route, navigation }) => {
//   const { listingId, ownerId, userId } = route.params; // Access params from navigation

//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   // Load messages from AsyncStorage when the screen is mounted
//   useEffect(() => {
//     const loadMessages = async () => {
//       const storedMessages = await AsyncStorage.getItem(`messages_${listingId}`);
//       if (storedMessages) {
//         setMessages(JSON.parse(storedMessages));
//       } else {
//         console.log("No messages found for this listing.");
//       }
//     };
//     loadMessages();
//   }, [listingId]);

//   // Send a message
//   const sendMessage = async () => {
//     if (!message) return Alert.alert('Error', 'Message cannot be empty.');

//     const newMessage = {
//       senderId: userId,
//       receiverId: ownerId,
//       message,
//       timestamp: new Date().toISOString(),
//     };

//     // Update the messages state and save to AsyncStorage
//     const updatedMessages = [...messages, newMessage];
//     setMessages(updatedMessages);
//     await AsyncStorage.setItem(`messages_${listingId}`, JSON.stringify(updatedMessages));

//     setMessage(''); // Clear message input
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={item.senderId === userId ? styles.myMessage : styles.otherMessage}>
//             <Text>{item.message}</Text>
//             <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
//           </View>
//         )}
//       />
//       <TextInput
//         placeholder="Type your message..."
//         value={message}
//         onChangeText={setMessage}
//         style={styles.input}
//       />
//       <Button title="Send" onPress={sendMessage} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   myMessage: {
//     backgroundColor: '#d1f7d1',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//   },
//   otherMessage: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignSelf: 'flex-end',
//   },
//   timestamp: {
//     fontSize: 10,
//     color: '#888',
//   },
// });

// export default MessageScreen;


// app/listings/MessageScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessageScreen = ({ route, navigation }) => {
  const { listingId, ownerId, userId } = route.params; // Access params from navigation

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Load messages from AsyncStorage when the screen is mounted
  useEffect(() => {
    const loadMessages = async () => {
      const storedMessages = await AsyncStorage.getItem(`messages_${listingId}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        console.log("No messages found for this listing.");
      }
    };
    loadMessages();
  }, [listingId]);

  // Send a message
  const sendMessage = async () => {
    if (!message) return Alert.alert('Error', 'Message cannot be empty.');

    const newMessage = {
      senderId: userId,
      receiverId: ownerId,
      message,
      timestamp: new Date().toISOString(),
    };

    // Update the messages state and save to AsyncStorage
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    await AsyncStorage.setItem(`messages_${listingId}`, JSON.stringify(updatedMessages));

    setMessage(''); // Clear message input
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.senderId === userId ? styles.myMessage : styles.otherMessage}>
            <Text>{item.message}</Text>
            <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        )}
      />
      <TextInput
        placeholder="Type your message..."
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  myMessage: {
    backgroundColor: '#d1f7d1',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  otherMessage: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
  },
});

// Ensure this is the default export
export default MessageScreen;
