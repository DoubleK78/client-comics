"use client"
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function SearchHeader() {
    const t = useTranslations('header');
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (searchValue != "" && searchValue != null)
            window.location.href = `/search?value=${searchValue}`;
        else
            window.location.href = "#"
    };

    const handleInputChange = (e: any) => {
        setSearchValue(e.target.value);
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <div className="input-group form-group header-search-box">
                <button
                    className="input-group-text anime-btn"
                    type="submit"
                    id="searchButton"
                >
                    <i className="fal fa-search" />
                </button>
                <input
                    className="form-control"
                    type="text"
                    name="query"
                    required={true}
                    placeholder={t('search')}
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </form>
    );
}
