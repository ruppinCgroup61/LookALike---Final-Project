import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { IoArrowBack } from "react-icons/io5";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import "../CSS/FollowerCloset.css";
import NaviBarFooter from "../Comps/NaviBarFooter";

function FollowerCloset() {
  const { email } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const likerEmail = sessionStorage.getItem("email");

  useEffect(() => {
    fetchItems();
  }, [email]);

  const fetchItems = async () => {
    try {
      const itemsResponse = await fetch(
        `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/Item/GetAllItemsByUser${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const itemsData = await itemsResponse.json();
      console.log("11");
      console.log(itemsData);
      console.log("11");

      const likesResponse = await fetch(
        `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/Algorithm/GetAllLikedItemsByFriend?AdminUserMail=${likerEmail}&ClosetOwnerMail=${email}`
      );
      const likesData = await likesResponse.json();

      const itemsWithLikes = itemsData.map((item) => ({
        ...item,
        isLiked: likesData.some(
          (likedItem) =>
            likedItem.itemId === item.item_ID && likedItem.isLiked === 1
        ),
      }));
      console.log("22");
      console.log(likesData);
      console.log("22");

      setItems(itemsWithLikes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  console.log("33");
  console.log(items)
  console.log("33");

  const handleLikeToggle = async (itemId, isCurrentlyLiked) => {
    try {
      if (isCurrentlyLiked) {
        // Remove like
        await fetch(
          `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/Algorithm/RemoveLike?adminUserMail=${likerEmail}&closetUserMail=${email}&itemId=${itemId}`,
          {
            method: "DELETE",
          }
        );
      } else {
        // Add like
        await fetch(
          "https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/Algorithm/LikeItemFromFriendCloset",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              adminUserMail: likerEmail,
              closetUserMail: email,
              itemId: itemId,
            }),
          }
        );
      }

      // Update local state
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.item_ID === itemId
            ? { ...item, isLiked: !isCurrentlyLiked }
            : item
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return (
    <div className="containerW">
      <div className="header_FC">
        <IoArrowBack
          className="FC_back-icon"
          onClick={() => navigate("/SocialNetwork")}
        />
        <h3>{email}</h3>
      </div>
      <div className="clothing-list-Follower">
        {items.map((item, index) => (
          <div key={index} className="clothing-item-Follower">
            <div className="clothing-image-Follower">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="clothing-details-Follower">
              <p>Type: {item.clothing_Type}</p>
              <p>Brand: {item.brand}</p>
            </div>
            {item.isLiked ? (
              <IoIosHeart
                className="FC_fav-icon-liked"
                onClick={() => handleLikeToggle(item.item_ID, true)}
                // style={{ color: "black" }}
              />
            ) : (
              <IoIosHeartEmpty
                className="FC_fav-icon"
                onClick={() => handleLikeToggle(item.item_ID, false)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="FooterFC">
        <NaviBarFooter />
      </div>
    </div>
  );
}

export default FollowerCloset;