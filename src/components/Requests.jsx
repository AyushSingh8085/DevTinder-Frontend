import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center my-10 max-w-6xl mx-auto">
        <h1 className="text-bold text-2xl">No Requests Found</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10 max-w-6xl mx-auto">
      <h1 className="text-bold text-4xl p-4">Connection Requests</h1>

      {requests.map((requests) => {
        const { _id, firstName, lastName, photoUrl, about, age, gender } =
          requests?.fromUserId;

        return (
          <div
            key={_id}
            className="flex items-center justify-between m-4 p-4 rounded-lg bg-base-300 flex-wrap scroll overflow-auto"
          >
            <div className="flex items-center">
              <img
                src={photoUrl}
                alt={firstName}
                className="w-12 h-12 rounded-full mr-4"
              />

              <span className="text-lg font-semibold">
                {firstName} {lastName}
              </span>
            </div>
            {age && gender && (
              <p>
                {age}, {gender}
              </p>
            )}
            <p>{about}</p>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("rejected", requests._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("accepted", requests._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
