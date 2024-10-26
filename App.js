import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';


const products = Array.from({ length: 12 }, (_, index) => ({
id: index + 1,
name: `New arrivals in Toys ${index + 1}`,
imageUrl: `box${index + 1}_image.jpg`, // Replace with your actual image URLs
inStock: Math.random() < 0.8, // 80% chance to be in stock
}));

const pincodes = ['110001', '110002', '110003', '110004', '110005']; // Sample pincodes

const App = () => {
const [selectedProduct, setSelectedProduct] = useState(null);
const [pincode, setPincode] = useState('');
const [estimatedDelivery, setEstimatedDelivery] = useState('');
const [timeRemaining, setTimeRemaining] = useState(0);
const [error, setError] = useState('');

useEffect(() => {
const timer = setInterval(() => {
if (timeRemaining > 0) {
setTimeRemaining((prev) => prev - 1);
}
}, 1000);
return () => clearInterval(timer);
}, [timeRemaining]);

const handleEstimateDelivery = () => {
setError('');
if (!selectedProduct) {
setError('Please select a product.');
return;
}
if (!pincode || !pincodes.includes(pincode)) {
setError('Invalid pincode.');
return;
}

const currentTime = new Date();
const cutoffA = new Date();
cutoffA.setHours(17, 0, 0);
const cutoffB = new Date();
cutoffB.setHours(9, 0, 0);

let provider = '';
let deliveryDate = '';

// Delivery logic
if (selectedProduct.inStock && currentTime < cutoffA) {
provider = 'Provider A';
deliveryDate = new Date();
setTimeRemaining((cutoffA.getTime() - currentTime.getTime()) / 1000); // seconds
} else if (selectedProduct.inStock && currentTime < cutoffB) {
provider = 'Provider B';
deliveryDate = new Date();
setTimeRemaining((cutoffB.getTime() - currentTime.getTime()) / 1000); // seconds
} else {
provider = 'General Partners';
deliveryDate = new Date();
deliveryDate.setDate(deliveryDate.getDate() + 3);
setTimeRemaining(0);
}

// Format delivery date
const formattedDate = `${deliveryDate.getDate()}/${deliveryDate.getMonth() + 1}/${deliveryDate.getFullYear()}`;
setEstimatedDelivery(`Delivery by: ${formattedDate} (via ${provider})`);
};

const handleProductSelect = (product) => {
setSelectedProduct(product);
setEstimatedDelivery('');
setTimeRemaining(0);
};

const formatTimeRemaining = (seconds) => {
const hours = Math.floor(seconds / 3600);
const minutes = Math.floor((seconds % 3600) / 60);
const secs = seconds % 60;
return `${hours}h ${minutes}m ${secs}s`;
};

return (
<ScrollView style={styles.container}>
<View style={styles.navbar}>
<View style={styles.navLogo}>
<Image source={{ uri: 'https://www.clinikally.com/cdn/shop/files/Clinikally_LOGO_for_Website_240x.png?v=1672654638' }} style={styles.logo} />
</View>
<View style={styles.navAddress}>
<Text style={styles.addFirst}>Deliver to</Text>
<View style={styles.addressIcon}>

<Text style={styles.addSecond}><b>India</b></Text>
</View>
</View>
<View style={styles.navSearch}>
<TextInput style={styles.searchInput} placeholder="Search Clinikally.in" />
<TouchableOpacity style={styles.searchIcon}>

</TouchableOpacity>
</View>
<View style={styles.mapIcon}>

<Text style={styles.langText}><b>EN</b></Text>
</View>
<TouchableOpacity style={styles.navSignIn}>
<Text>Hello, sign in</Text>
<Text style={styles.navSecond}>Accounts & Lists</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.navReturn}>
<Text>Returns</Text>
<Text style={styles.navSecond}>& Orders</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.navCart}>

<Text>Cart</Text>
</TouchableOpacity>
</View>

<View style={styles.panel}>
<Text style={styles.panelOptions}>Today's Deals</Text>
<Text style={styles.panelOptions}>Customer Service</Text>
<Text style={styles.panelOptions}>Registry</Text>
<Text style={styles.panelOptions}>Gift Cards</Text>
<Text style={styles.panelOptions}>Sell</Text>
</View>

<View style={styles.heroSection}>
<View style={styles.heroMsg}>
<Text>You are on Clinikally.com. You can also shop on Clinikally India for millions of products with fast local delivery.</Text>
</View>
</View>

<View style={styles.shopSection}>
<Text style={styles.shopTitle}>Select a Product:</Text>
<View style={styles.productGrid}>
{products.map((product) => (
<TouchableOpacity
key={product.id}
style={[styles.box, { opacity: product.inStock ? 1 : 0.5 }]}
onPress={() => handleProductSelect(product)}
disabled={!product.inStock}
>
<View style={styles.boxContent}>
<Text style={styles.boxTitle}>{product.name}</Text>
<View
style={[styles.boxImg, { backgroundImage: `url(${product.imageUrl})` }]}
/>
<Text style={styles.boxLink}>See more</Text>
</View>
</TouchableOpacity>
))}
</View>
</View>

<View style={styles.pincodeSection}>
<TextInput
style={styles.pincodeInput}
placeholder="Enter Pincode"
value={pincode}
onChangeText={setPincode}
keyboardType="numeric"
/>
<TouchableOpacity style={styles.button} onPress={handleEstimateDelivery}>
<Text style={styles.buttonText}>Estimate Delivery</Text>
</TouchableOpacity>
{error ? <Text style={styles.error}>{error}</Text> : null}
{estimatedDelivery ? <Text style={styles.result}>{estimatedDelivery}</Text> : null}
{timeRemaining > 0 && (
<Text style={styles.timer}>
Time remaining for same-day delivery: {formatTimeRemaining(timeRemaining)}
</Text>
)}
</View>

<View style={styles.footer}>
<Text style={styles.footPanel1}>Back to Top</Text>
<View style={styles.footPanel2}>
<Text>Get to know Us</Text>
</View>
<Text style={styles.copyright}>© 1996-2023, Clinikally.com, Inc. or its affiliates</Text>
</View>
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
},
navbar: {
height: 60,
backgroundColor: '#0f1111',
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-evenly',
},
navLogo: {
height: 50,
width: 100,
},
logo: {
backgroundColor: "white",
backgroundSize: 'cover',
height: 60,
width: 100,
},
addFirst: {
color: '#cccccc',
fontSize: 12,
},
addSecond: {
fontSize: 14,
},
addressIcon: {
flexDirection: 'row',
alignItems: 'center',
},
navSearch: {
flexDirection: 'row',
alignItems: 'center',
backgroundColor: 'orange',
width: 620,
height: 40,
borderRadius: 4,
},
searchInput: {
flex: 1,
fontSize: 16,
borderWidth: 0,
},
searchIcon: {
width: 50,
justifyContent: 'center',
alignItems: 'center',
},
mapIcon: {
flexDirection: 'row',
alignItems: 'center',
},
langText: {
color: '#ffff',
},
navSignIn: {
alignItems: 'center',
},
navReturn: {
alignItems: 'center',
},
navCart: {
alignItems: 'center',
},
panel: {
height: 40,
backgroundColor: '#222f3d',
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-evenly',
color: 'white',
},
panelOptions: {
marginHorizontal: 15,
color: 'white',
fontSize: 14,
},
heroSection: {
backgroundColor: '#e2e7e6',
height: 350,
justifyContent: 'flex-end',
alignItems: 'center',
},
heroMsg: {
backgroundColor: 'white',
padding: 10,
textAlign: 'center',
},
shopSection: {
marginVertical: 20,
paddingHorizontal: 20,
},
shopTitle: {
width: '100%',
textAlign: 'center',
fontSize: 18,
marginVertical: 10,
},
productGrid: {
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'space-between',
},
box: {
height: 200,
width: '48%',
backgroundColor: 'white',
margin: 5,
borderRadius: 5,
justifyContent: 'center',
alignItems: 'center',
padding: 10,
borderWidth: 2,
borderColor: 'transparent',
},
boxContent: {
alignItems: 'center',
},
boxTitle: {
fontSize: 16,
fontWeight: 'bold',
},
boxImg: {
height: 120,
width: '100%',
backgroundSize: 'cover',
marginVertical: 10,
},
boxLink: {
color: '#007185',
},
pincodeSection: {
marginTop: 20,
paddingHorizontal: 20,
},
pincodeInput: {
height: 40,
borderColor: '#ccc',
borderWidth: 1,
marginBottom: 10,
paddingLeft: 10,
},
button: {
backgroundColor: 'orange',
padding: 10,
alignItems: 'center',
borderRadius: 5,
},
buttonText: {
color: '#fff',
fontSize: 16,
},
result: {
marginTop: 10,
fontWeight: 'bold',
},
error: {
color: 'red',
marginTop: 10,
},
timer: {
marginTop: 10,
color: 'green',
},
footer: {
marginTop: 15,
backgroundColor: '#222f3d',
color: 'white',
padding: 10,
},
footPanel1: {
backgroundColor: '#37475a',
color: 'white',
textAlign: 'center',
padding: 10,
},
footPanel2: {
backgroundColor: '#222f3d',
color: 'white',
padding: 10,
},
copyright: {
textAlign: 'center',
color: '#dddddd',
},
});

export default App;
