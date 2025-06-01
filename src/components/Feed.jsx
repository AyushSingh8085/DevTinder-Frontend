import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import UserCards from "./UserCards";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, [feed]);

  if (!feed) return;

  if (feed.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <p className="text-lg">No users available in the feed.</p>
      </div>
    );
  }

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCards user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
