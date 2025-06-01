import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCards = ({ user }) => {
  const { photoUrl, firstName, lastName, age, gender, about, _id } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeed(_id));
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-xl">
        <figure className="py-5">
          <img src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <div className="badge badge-secondary">
              {age}, {gender}
            </div>
          )}
          <p>
            {about ||
              "This user has not provided any information about themselves."}
          </p>
          <div className="card-actions justify-center py-5">
            <div
              className="btn btn-primary py-5 cursor-pointer"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </div>
            <div
              className="btn btn-secondary py-5 cursor-pointer"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
