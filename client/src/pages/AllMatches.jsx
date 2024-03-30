import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllMatches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.cricapi.com/v1/series_info?apikey=e7ebe5f5-b5c9-4f87-8a1f-925d47378409&id=76ae85e2-88e5-4e99-83e4-5f352108aebc"
    )
      .then((response) => response.json())
      .then((data) => setMatches(data.data.matchList));
  }, []);

  return (
    <div className="p-4 bg-black text-white">
      {matches.map((match, index) => (
        <Link to={`/match/${match.id}`} key={index}>
          <div className="mb-4 p-4 border border-gray-700 rounded cursor-pointer hover:bg-gray-800">
            <h2 className="text-xl mb-2 text-yellow-500">{match.name}</h2>
            <p>
              <strong>Type:</strong> {match.matchType}
            </p>
            <p>
              <strong>Status:</strong> {match.status}
            </p>
            <p>
              <strong>Venue:</strong> {match.venue}
            </p>
            <p>
              <strong>Date:</strong> {match.date}
            </p>
            <div className="flex">
              {match.teamInfo.map((team, index) => (
                <div key={index} className="mr-4">
                  <img src={team.img} alt={team.name} className="w-12 h-12" />
                  <p className="text-green-500">{team.name}</p>
                </div>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AllMatches;
