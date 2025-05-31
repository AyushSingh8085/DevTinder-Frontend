import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10 max-w-6xl mx-auto">
        <h1 className="text-bold text-2xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10 max-w-6xl mx-auto">
      <h1 className="text-bold text-4xl text-white p-4">Conections</h1>

      {connections.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          emailId,
          about,
          age,
          gender,
        } = connection;

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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
