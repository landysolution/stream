"use client";

import React, { useState } from "react";

const EpisodeList = ({
    list = [],
    onSelect,
    currentEpisode,
}) => {
    const seasons = [...new Set(list.map((episode) => episode.season))];

    const [selectedSeason, setSelectedSeason] = useState(
        currentEpisode?.season || seasons[0]
    );

    const episodes = list.filter(
        (episode) => episode.season === selectedSeason
    );

    return (
        <div className="flex flex-col gap-4">

            {/* Seasons */}
            <div className="flex gap-2">
                {seasons.map((season) => (
                    <button
                        key={season}
                        onClick={() => setSelectedSeason(season)}
                        className={`px-4 py-2 rounded-lg transition ${
                            selectedSeason === season
                                ? "bg-white text-black"
                                : "bg-white/10 text-white/60 hover:bg-white/20"
                        }`}
                    >
                         {season}
                    </button>
                ))}
            </div>

            {/* Episodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {episodes.map((episode) => {
                    const isCurrent =
                        currentEpisode?.season === episode.season &&
                        currentEpisode?.episode === episode.episode;

                    return (
                        <button
                            key={`${episode.season}-${episode.episode}`}
                            onClick={() => onSelect(episode)}
                            className={`flex items-center gap-3 p-3 rounded-lg transition text-left ${
                                isCurrent
                                    ? "bg-white/20"
                                    : "bg-white/5 hover:bg-white/10"
                            }`}
                        >
                            <span className="text-white/40 text-sm">
                                E{String(episode.episode).padStart(2, "0")}
                            </span>

                            <span className="text-white text-sm">
                                {episode.title}
                            </span>
                        </button>
                    );
                })}
            </div>

        </div>
    );
};

export default EpisodeList;