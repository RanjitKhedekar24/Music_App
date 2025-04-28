import React, { useEffect, useState, useCallback } from "react";
import Player from "../Component/player";
import { TbMusicSearch } from "react-icons/tb";
import { MdHistory, MdClear } from "react-icons/md";
import { FaMusic } from "react-icons/fa";
import { songsData } from "../songs";
import { Card } from "../Component/Card";

export let Search = () => {
  let [input, setInput] = useState("");
  let [newList, setNewList] = useState([]);
  let [searchHistory, setSearchHistory] = useState([]);
  let [searchCategory, setSearchCategory] = useState("all");
  let [showHistory, setShowHistory] = useState(false);
  let [loading, setLoading] = useState(false);
  let [suggestions, setSuggestions] = useState([]);
  let [selectedSuggestion, setSelectedSuggestion] = useState(-1);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const filterSongs = useCallback((searchTerm, category) => {
    return songsData.filter((song) => {
      const term = searchTerm.toLowerCase();
      switch (category) {
        case "name":
          return song.name.toLowerCase().includes(term);
        case "artist":
          return song.singer.toLowerCase().includes(term);
        default:
          return (
            song.name.toLowerCase().includes(term) ||
            song.singer.toLowerCase().includes(term)
          );
      }
    });
  }, []);

  useEffect(() => {
    if (!input) {
      setNewList([]);
      setSuggestions([]);
      return;
    }

    setLoading(true);
    const debouncedSearch = debounce(() => {
      const filteredSongs = filterSongs(input, searchCategory);
      setNewList(filteredSongs);
      
      // Generate suggestions
      const suggestedTerms = [...new Set(filteredSongs.map(song => 
        song.name.toLowerCase().includes(input.toLowerCase()) ? song.name : song.singer
      ))].slice(0, 5);
      setSuggestions(suggestedTerms);
      setLoading(false);
    }, 300);

    debouncedSearch();
    return () => debouncedSearch.cancel;
  }, [input, searchCategory, filterSongs]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : -1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestion(prev => 
        prev > -1 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && selectedSuggestion > -1) {
      e.preventDefault();
      handleSearch(suggestions[selectedSuggestion]);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) return;
    
    const updatedHistory = [
      searchTerm,
      ...searchHistory.filter((item) => item !== searchTerm),
    ].slice(0, 5);
    
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setInput(searchTerm);
    setShowHistory(false);
    setSuggestions([]);
    setSelectedSuggestion(-1);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <>
      <div className="w-[100%] h-[100vh] bg-black flex justify-start items-center flex-col md:pt-[100px] pt-[20px] gap-[30px]">
        <Player />
        <div className="w-[90%] md:w-[70%] flex flex-col gap-4 relative">
          <form
            className="w-full h-[60px] bg-gray-800 flex items-center gap-4 rounded-lg px-6 relative transition-all duration-300 hover:bg-gray-700"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(input);
            }}
          >
            <TbMusicSearch className={`text-2xl ${loading ? 'animate-spin text-white' : 'text-gray-300'}`} />
            <input
              type="text"
              placeholder="Search for songs..."
              className="w-full h-full bg-transparent text-white outline-none placeholder:text-gray-400"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              onFocus={() => setShowHistory(true)}
            />
            <MdHistory
              className="text-2xl text-gray-300 cursor-pointer hover:text-white transition-colors"
              onClick={() => setShowHistory(!showHistory)}
            />
          </form>

          {suggestions.length > 0 && input && (
            <div className="absolute top-[70px] w-full bg-gray-800 rounded-lg p-4 z-20 shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-2 cursor-pointer ${
                    index === selectedSuggestion ? 'bg-gray-700 text-white' : 'text-gray-300'
                  } hover:bg-gray-700 hover:text-white transition-colors rounded`}
                  onClick={() => handleSearch(suggestion)}
                >
                  <FaMusic />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 justify-center">
            {["all", "name", "artist"].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  searchCategory === category
                    ? 'bg-white text-black scale-105'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
                onClick={() => setSearchCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {showHistory && searchHistory.length > 0 && !suggestions.length && (
            <div className="absolute top-[140px] w-full bg-gray-800 rounded-lg p-4 z-10 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-semibold">Recent Searches</h3>
                <MdClear
                  className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                  onClick={clearHistory}
                />
              </div>
              {searchHistory.map((term, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer p-2 rounded transition-colors"
                  onClick={() => handleSearch(term)}
                >
                  <MdHistory />
                  <span>{term}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-white flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : input ? (
          <div className="w-full h-[calc(100vh-250px)] flex flex-col p-6 gap-5 items-center overflow-y-auto">
            {newList.length > 0 ? (
              newList.map((song, index) => (
                <Card
                  key={index}
                  name={song.name}
                  image={song.image}
                  singer={song.singer}
                  songIndex={song.id - 1}
                />
              ))
            ) : (
              <div className="text-gray-600 flex flex-col items-center gap-4 animate-fade-in">
                <FaMusic className="text-6xl mb-4" />
                <p className="text-2xl font-semibold">No results found</p>
                <p className="text-lg text-center">
                  Try searching with different keywords<br />
                  or try another category
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-600 flex flex-col justify-center items-center gap-4 font-semibold text-3xl mt-20">
            <FaMusic className="text-6xl mb-4" />
            <p>Search Songs...</p>
            <p className="text-lg text-center text-gray-500">
              Type to search by song name or artist
            </p>
          </div>
        )}
      </div>
    </>
  );
};