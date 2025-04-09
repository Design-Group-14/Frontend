import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

// Default center: Dublin
const defaultPosition = [53.3444, -6.2573];

const MapView = ({ posts }) => {
  const navigate = useNavigate();

  // Filter posts that have coordinates
  const pins = posts.filter(p => p.latitude && p.longitude);

  // Group posts by lat+lng and keep only the one with the highest ID
  const groupedByLocation = {};
  for (const post of pins) {
    const key = `${post.latitude},${post.longitude}`;
    if (!groupedByLocation[key] || post.id > groupedByLocation[key].id) {
      groupedByLocation[key] = post; // keep the newest one
    }
  }

  const uniquePosts = Object.values(groupedByLocation);

  return (
    <div className="w-full mt-4">
      <MapContainer
        center={defaultPosition}
        zoom={12}
        style={{ height: "400px", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {uniquePosts.map((post) => (
          <Marker
            key={post.id}
            position={[post.latitude, post.longitude]}
          >
            <Popup>
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <strong>{post.title}</strong>
                <br />
                {post.content}
                <br />
                <em>{post.user}</em>
                {post.image_url && (
                  <>
                    <br />
                    <img
                      src={post.image_url}
                      alt="post"
                      className="mt-2 rounded max-w-[200px] max-h-[150px] border"
                    />
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
