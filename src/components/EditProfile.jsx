import React, { useState } from "react";
import UserCards from "./UserCards";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(
        error?.response?.data || "Failed to save profile. Please try again."
      );
    }
  };

  return (
    <>
      {showToast && (
        <div className="toast">
          <div className="alert alert-info">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
      <div className="flex justify-around my-10 max-w-6xl mx-auto flex-wrap">
        <div className="flex justify-center">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="scrollbar max-h-96 overflow-y-auto px-4">
                <div className="pb-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label py-2">
                      <span className="label-text">First name</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="input input-bordered w-full max-x-xs"
                    />
                  </label>
                </div>
                <div className="pb-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label py-2">
                      <span className="label-text">Last name</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="input input-bordered w-full max-x-xs"
                    />
                  </label>
                </div>
                <div className="pb-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label py-2">
                      <span className="label-text">About</span>
                    </div>
                    <input
                      type="text"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="input input-bordered w-full max-x-xs"
                    />
                  </label>
                </div>
                <div className="pb-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label py-2">
                      <span className="label-text">Age</span>
                    </div>
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="input input-bordered w-full max-x-xs"
                    />
                  </label>
                </div>
                <div className="pb-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label py-2">
                      <span className="label-text">Gender</span>
                    </div>
                    <input
                      type="text"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="input input-bordered w-full max-x-xs"
                    />
                  </label>
                </div>
                <div className="pb-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label py-2">
                      <span className="label-text">PhotoUrl</span>
                    </div>
                    <input
                      type="text"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="input input-bordered w-full max-x-xs"
                    />
                  </label>
                </div>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center m-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={saveProfile}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <UserCards
            user={{ firstName, lastName, age, gender, about, photoUrl }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
