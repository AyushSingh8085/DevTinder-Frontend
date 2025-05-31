import React from "react";

const UserCards = ({ user }) => {
  const { photoUrl, firstName, lastName, age, gender, about } = user || {};

  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-xl">
        <figure className="py-5">
          <img src={user?.photoUrl} alt="photo" />
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
            <div className="btn btn-primary py-5 cursor-pointer">Ignore</div>
            <div className="btn btn-secondary py-5 cursor-pointer">
              Interested
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
