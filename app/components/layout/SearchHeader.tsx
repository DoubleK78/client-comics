"use client"
import SearchComicFilter from "@/app/models/common/SearchComicFilter";
import { getLangByLocale } from "@/app/utils/HelperFunctions";
import { pathnames } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

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
        setComicSuggestions([
            {
                title: 'Để có thể sống sót',
                friendlyName: 'de-co-the-song-sot'
            },
            {
                title: 'Hoán đổi diệu kỳ',
                friendlyName: 'hoan-doi-dieu-ky'
            }
        ])

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

        if (comicSuggestions) {
            const filteredSuggestions = comicSuggestions.filter((item) =>
                item.title?.toLowerCase().startsWith(e.target.value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
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
        if (comicSuggestions) {
            const filteredSuggestions = comicSuggestions.filter((item) =>
                item.title?.toLowerCase().startsWith(searchValue.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        }
    };

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
