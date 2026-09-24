"use client";

import { useEffect, useRef, useState } from "react";
import EpisodeList from "@/component/EpisodeList";
import list from "@/asset/r2-videos";
import ClickSpark from "@/components/ClickSpark";
import FreeSpace from "@/component/FreeSpace";
import GlowCursor from "@/components/GlowCursor";
import Candle from "@/components/Candle";
const STORAGE_KEY = "korra-progress";

export default function Home() {
  const videoRef = useRef(null);

  const [currentEpisode, setCurrentEpisode] = useState(list[0]);

  // Load last watched episode
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      const progress = JSON.parse(saved);

      const episode = list.find(
        (item) =>
          item.season === progress.season &&
          item.episode === progress.episode
      );

      if (episode) {
        setCurrentEpisode(episode);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
  }, []);

  // Change video when episode changes
  useEffect(() => {
    const video = videoRef.current;

    if (!video || !currentEpisode) return;

    video.src = currentEpisode.url;
    video.load();

    const handleLoadedMetadata = () => {
      video.play().catch((error) => {
        console.log("Autoplay failed:", error);
      });
    };

    const handleEnded = () => {
      const currentIndex = list.findIndex(
        (episode) =>
          episode.season === currentEpisode.season &&
          episode.episode === currentEpisode.episode
      );

      const nextEpisode = list[currentIndex + 1];

      if (nextEpisode) {
        setCurrentEpisode(nextEpisode);
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, [currentEpisode]);

  // Restore playback position after video metadata loads
  useEffect(() => {
    const video = videoRef.current;

    if (!video || !currentEpisode) return;

    const restoreProgress = () => {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) return;

      try {
        const progress = JSON.parse(saved);

        if (
          progress.season === currentEpisode.season &&
          progress.episode === currentEpisode.episode &&
          progress.time > 0 &&
          progress.time < video.duration
        ) {
          video.currentTime = progress.time;
        }
      } catch (error) {
        console.error("Failed to restore progress:", error);
      }
    };

    video.addEventListener("loadedmetadata", restoreProgress);

    return () => {
      video.removeEventListener(
        "loadedmetadata",
        restoreProgress
      );
    };
  }, [currentEpisode]);

  // Save progress
  useEffect(() => {
    const video = videoRef.current;

    if (!video || !currentEpisode) return;

    const saveProgress = () => {
      if (!video.duration) return;

      const progress = {
        season: currentEpisode.season,
        episode: currentEpisode.episode,
        time: video.currentTime,
      };

      localStorage.setItem(
        "korra-progress",
        JSON.stringify(progress)
      );
    };

    // Save immediately when paused
    video.addEventListener("pause", saveProgress);

    // Save every 30 seconds
    const interval = setInterval(() => {
      if (!video.paused) {
        saveProgress();
      }
    }, 30000);

    return () => {
      video.removeEventListener("pause", saveProgress);
      clearInterval(interval);
    };
  }, [currentEpisode]);
  const handleEpisodeChange = (episode) => {
    setCurrentEpisode(episode);
  };

  return (





    <main className="flex flex-col lg:p-5 p-2 gap-5">

      <div className="flex gap-2">
        <div className="w-full lg:w-[60%] aspect-video">
          <video
            ref={videoRef}
            controls
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            className="w-full h-full object-contain"
          >
            {currentEpisode?.subtitleUrl && (
              <track
                key={currentEpisode.subtitleUrl}
                kind="subtitles"
                src={currentEpisode.subtitleUrl}
                srcLang="en"
                label="English"
                default
              />
            )}
          </video>
        </div>
        <div className="w-[40%] relative lg:block hidden">
          <FreeSpace />
        </div>
      </div>


      <EpisodeList
        list={list}
        onSelect={handleEpisodeChange}
        currentEpisode={currentEpisode}
      />

    </main >

  );
}