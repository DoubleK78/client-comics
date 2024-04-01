"use client"
import SearchComicFilter from "@/app/models/common/SearchComicFilter";
import SearchComicStorage from "@/app/models/common/SearchComicStorage";
import { getDayjsByLocale, getLangByLocale, getRegionByLocale } from "@/app/utils/HelperFunctions";
import { parseJsonFromString } from "@/lib/json";
import { getSearchComics } from "@/lib/services/client/search-comics/searchComics";
import { pathnames } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import dayjs from '@/lib/dayjs/dayjs-custom';
import { ERegion } from "@/app/models/comics/ComicSitemap";
import FuzzySearch from 'fuzzy-search';

export default function SearchHeader() {
    const t = useTranslations('header');
    const locale = useLocale();
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState<Array<SearchComicFilter> | null>([]);
    const [comicSuggestions, setComicSuggestions] = useState<Array<SearchComicFilter> | null>([]);
    const autocompleteRef = useRef<any>(null);
    const inputRef = useRef<any>(null);
    const comicRoute = locale === 'vi' ? pathnames['/comics/[comicid]'][getLangByLocale(locale)] : `/${getLangByLocale(locale)}${pathnames['/comics/[comicid]'][getLangByLocale(locale)]}`;

    useEffect(() => {
        const searchComicJson = localStorage.getItem("search_comic");
        // Case 1: Not exist
        if (searchComicJson === null) {
            getSearchComics(getRegionByLocale(locale)).then(res => {
                if (res?.data) {
                    setComicSuggestions(res?.data);
                    if (getRegionByLocale(locale) === ERegion.vn) {
                        localStorage.setItem("search_comic", JSON.stringify({
                            date: getDayjsByLocale(locale).utc().format(),
                            comicsViFilters: res?.data
                        }));
                    }
                    else if (getRegionByLocale(locale) === ERegion.en) {
                        localStorage.setItem("search_comic", JSON.stringify({
                            date: getDayjsByLocale(locale).utc().format(),
                            comicsEnFilters: res?.data
                        }));
                    }
                }
            });
        }
        else {
            const searchComicStorage = parseJsonFromString<SearchComicStorage>(localStorage.getItem("search_comic"));
            // Case 2: Same Date then using local storage
            if (searchComicStorage &&
                ((getRegionByLocale(locale) === ERegion.vn && searchComicStorage.comicsViFilters) || (getRegionByLocale(locale) === ERegion.en && searchComicStorage.comicsEnFilters)) &&
                dayjs.utc(searchComicStorage.date).isSame(dayjs.utc(), 'day')) {
                if (getRegionByLocale(locale) === ERegion.vn) {
                    setComicSuggestions(searchComicStorage.comicsViFilters);
                }
                else if (getRegionByLocale(locale) === ERegion.en) {
                    setComicSuggestions(searchComicStorage.comicsEnFilters);
                }
            }
            // Case 3: Out of Date
            else {
                getSearchComics(getRegionByLocale(locale)).then(res => {
                    if (res?.data) {
                        setComicSuggestions(res?.data);
                        localStorage.setItem("search_comic", JSON.stringify({
                            date: getDayjsByLocale(locale).utc().format(),
                            comicsViFilters: getRegionByLocale(locale) === ERegion.vn ? res?.data : searchComicStorage?.comicsViFilters,
                            comicsEnFilters: getRegionByLocale(locale) === ERegion.en ? res?.data : searchComicStorage?.comicsEnFilters
                        }));
                    }
                });
            }
        }
    }, [locale])

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (autocompleteRef.current &&
                !autocompleteRef.current.contains(event.target) &&
                !inputRef.current.contains(event.target)
            ) {
                setSuggestions([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (searchValue != "" && searchValue != null)
            window.location.href = `/search?value=${searchValue}`;
        else
            window.location.href = "/search"
    };

    const handleInputChange = (e: any) => {
        setSearchValue(e.target.value);
        if (comicSuggestions && e.target.value !== '') {
            const filteredSuggestions = fuzzySearchTitles(e.target.value).slice(0, 5);
            setSuggestions(filteredSuggestions);
        }
        else {
            setSuggestions(comicSuggestions?.slice(0, 5) ?? []);
        }
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    const handleSuggestionClick = (suggestion: SearchComicFilter) => {
        if (suggestion.friendlyName) {
            window.location.href = comicRoute.replace('[comicid]', suggestion.friendlyName);
        }
    };

    const handleFocus = () => {
        if (comicSuggestions && searchValue !== '') {
            const filteredSuggestions = fuzzySearchTitles(searchValue).slice(0, 5);
            setSuggestions(filteredSuggestions);
        }
        else {
            setSuggestions(comicSuggestions?.slice(0, 5) ?? []);
        }
    };

    // Function to perform fuzzy search
    function fuzzySearchTitles(userInput: string) {
        if (comicSuggestions) {
            // Create a fuzzy search instance with desired options
            const searcher = new FuzzySearch(comicSuggestions, ['title'], {
                caseSensitive: false, // Adjust for case sensitivity as needed
                // Add other options like threshold (minimum score for a match)
            });

            // Search for matches based on user input
            const results = searcher.search(userInput);

            // Return the list of matched titles
            return results;
        }

        return [];
    }

    return (
        <form onSubmit={handleSearch}>
            <div className="input-group form-group header-search-box" ref={autocompleteRef}>
                <button
                    className="input-group-text anime-btn"
                    type="submit"
                    id="searchButton"
                >
                    <i className="fal fa-search" />
                </button>
                <input
                    className="form-control autocomplete-search"
                    type="text"
                    name="query"
                    required={true}
                    placeholder={t('search')}
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    autoComplete="off"
                    ref={inputRef}
                    onFocus={handleFocus}
                />
                {suggestions && suggestions.length > 0 && (
                    <div className="autocomplete-suggestions">
                        {suggestions.map((suggestion) => (
                            <div
                                key={uuidv4()}
                                className="suggestion"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </form>
    );
}
