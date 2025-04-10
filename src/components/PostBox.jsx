import { useState, useRef, useEffect } from "react";
import { uploadImageToFirebase } from "../utils/uploadImage";
import { PlusCircle } from "lucide-react";
import { AddressFinder } from "@ideal-postcodes/address-finder";

const PostBox = () => {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(""); // 🆕
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [addressCoordinates, setAddressCoordinates] = useState(null);

  const fileInputRef = useRef(null);
  const addressContainerRef = useRef(null);

  // Function to geocode an address (convert to coordinates)
  const geocodeAddress = async (address) => {
    try {
      // Use a public geocoding API (Nominatim/OpenStreetMap)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        console.log("📍 Geocoded coordinates:", lat, lon);
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
      }
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  useEffect(() => {
    // Need to ensure DOM is fully loaded
    if (!addressContainerRef.current) return;

    // Create address finder instance with proper initialization
    try {
      AddressFinder.setup({
        apiKey: "ak_m9ami8w7bJZ49j5bJC9llpqxxDoEP",
        inputField: "#address-finder",
        container: "#address-finder-container",
        defaultCountry: "GB",
        removeOrganization: true, // Remove organization from results for cleaner display
        autocomplete: true, // Enable autocomplete as we type
        onAddressRetrieved: async (address) => {
          // Format the full address as a string
          const formattedAddress = [
            address.line_1,
            address.line_2,
            address.line_3,
            address.post_town,
            address.postcode
          ].filter(Boolean).join(", ");
          
          setLocation(formattedAddress);
          
          // Check if the address has coordinates directly
          if (address.latitude && address.longitude) {
            setAddressCoordinates({
              latitude: address.latitude,
              longitude: address.longitude
            });
            console.log("📍 Got coordinates from Ideal Postcodes:", address.latitude, address.longitude);
          } else {
            // If no coordinates provided, use geocoding
            console.log("📍 No coordinates from API, geocoding address:", formattedAddress);
            const coords = await geocodeAddress(formattedAddress);
            if (coords) {
              setAddressCoordinates(coords);
            }
          }
        }
      });
    } catch (err) {
      console.error("Error setting up address finder:", err);
      setError("Address search initialization failed. Please use manual input.");
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handlePost = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.email) {
        throw new Error("User is not authenticated or missing email.");
      }
  
      let imageUrl = null;
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImageToFirebase(imageFile, setUploadProgress);
        setUploading(false);
      }
  
      let latitude = null;
      let longitude = null;
      let finalLocation = location;
      
      // If we have address coordinates, use them
      if (addressCoordinates) {
        latitude = addressCoordinates.latitude;
        longitude = addressCoordinates.longitude;
        console.log("📍 Using searched address coordinates:", latitude, longitude);
      }
      // Only get current location if no address was searched
      else if (!location || location.trim() === "") {
        try {
          const position = await new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            })
          );
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          finalLocation = "Current Location"; // Set a default location label
          console.log("📍 Using current coordinates:", latitude, longitude);
        } catch (geoError) {
          console.warn("Geolocation failed or denied by user:", geoError);
        }
      } else {
        // We have a location but no coordinates - try to geocode it now
        console.log("📍 Trying to geocode address at submission time:", location);
        const lastMinuteCoords = await geocodeAddress(location);
        if (lastMinuteCoords) {
          latitude = lastMinuteCoords.latitude;
          longitude = lastMinuteCoords.longitude;
          console.log("📍 Got coordinates at submission time:", latitude, longitude);
        } else {
          console.log("📍 Using selected address without coordinates:", location);
        }
      }
  
      const response = await fetch("http://localhost:8000/api/posts/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title || "Untitled Post",
          content: post,
          email: user.email,
          image_url: imageUrl,
          latitude,
          longitude,
          location: finalLocation,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }
  
      console.log("✅ Post created successfully");
      setPost("");
      setTitle("");
      setLocation(""); // reset
      setImageFile(null);
      setUploadProgress(0);
      setError("");
      setAddressCoordinates(null); // Reset coordinates
    } catch (error) {
      console.error("Error creating post:", error);
      setError(error.message || "Failed to create post");
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">What&apos;s happening?</h2>

      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

      {/* Address finder container */}
      <div className="mb-3" ref={addressContainerRef}>
        <div id="address-finder-container">
          <input
            id="address-finder"
            type="text"
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Where are you posting from? (e.g. Trinity Library)"
          />
        </div>
        
        {/* Display the selected location */}
        {location && (
          <div className="mt-2 p-2 bg-gray-100 rounded-lg text-sm">
            <p className="font-semibold">Selected location:</p>
            <p>{location}</p>
          </div>
        )}
      </div>

      <input
        type="text"
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Post title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="relative mb-3">
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a post..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button
          type="button"
          onClick={handleIconClick}
          className="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
        >
          <PlusCircle size={28} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setImageFile(e.target.files[0])}
          className="hidden"
        />
      </div>

      {imageFile && (
        <div className="mb-3">
          <p className="text-sm text-gray-600">Image Preview:</p>
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="max-w-full h-auto rounded border"
          />
        </div>
      )}

      {uploading && uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {uploading && <div className="text-sm text-gray-500 mb-2">Uploading image...</div>}

      <button
        onClick={handlePost}
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        disabled={uploading}
      >
        {uploading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default PostBox;
