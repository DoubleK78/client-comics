"use client"
import ServerResponse from '@/app/models/common/ServerResponse';
import PagingRequest from '@/app/models/paging/PagingRequest';
import React, { useEffect, useState } from 'react';
import { portalServer } from "@/lib/services/client/baseUrl";
import axiosClientApiInstance from '@/lib/services/client/interceptor';
import { useTranslations } from 'next-intl';

const getTypes = async (locale: any) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>(portalServer + `/api/contentType/all?region=${locale}`);
        return response.data;
    } catch (error) {
        return null;
    }
};

export function FilterComponent({ locale, pagingParams, setPagingParams, filter, setFilter, setIsSubmitFilter, isSubmitFilter }: { locale: any, pagingParams: PagingRequest, setPagingParams: any, filter: any, setFilter: any, setIsSubmitFilter: any, isSubmitFilter: any }) {
    const t = useTranslations('search');

    const years: any[] = Array.from({ length: 30 }, (_, index) => ({ id: `yr${index + 1}`, name: `${2023 - index}` }));
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const [contentTypes, setContentTypes] = useState<any>();

    const handleGenreChange = (genreId: string) => {
        let selectedGenres = []
        if (typeof filter.genre === 'string') {
            var stringArray = filter.genre.split(',');
            selectedGenres = stringArray.map((str: any) => Number(str.trim()));
        } else {
            selectedGenres = filter.genre;
        }

        const updatedGenres = selectedGenres.includes(genreId)
            ? selectedGenres.filter((id: any) => id !== genreId)
            : [...selectedGenres, genreId];
        setFilter({ ...filter, genre: updatedGenres });
    };

    const handleSubmitFilter = () => {
        setIsSubmitFilter(!isSubmitFilter);
    };

    const handleYearChange = (year: string) => {
        let selectedYears = [];

        if (typeof filter.year === 'string') {
            var stringArray = filter.year.split(',');
            selectedYears = stringArray.map((str: any) => str.trim());
        } else {
            selectedYears = filter.year || [];
        }

        const updatedYears = selectedYears.includes(year)
            ? selectedYears.filter((x: any) => x !== year)
            : [...selectedYears, year];
        setFilter({ ...filter, year: updatedYears });
    };

    const handleStatusChange = (status: boolean) => {
        setFilter({ ...filter, status: status });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPagingParams({ ...pagingParams, SortColumn: e.target.id, SortDirection: 'desc' })
    };

    useEffect(() => {
        getTypes(locale)
            .then(response => {
                if (response && response.data) {
                    setContentTypes(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching types:', error);
            });
    }, []);

    return (
        <>
            {/* <!--=====================================-->
        <!--=        filter Area Start          =-->
        <!--=====================================--> */}
            <section className="filter sec-mar">
                <div className="container">
                    <ul className="filter-block">
                        <li>
                            <button
                                className={`anime-btn btn-dark`}
                                type='button'
                                onClick={() => setFilter({ ...filter, firstChar: '' })}
                            >
                                {t('all')}
                            </button>
                        </li>
                        {alphabet.split('').map((letter, index) => (
                            <li key={index}>
                                <button
                                    className={`anime-btn btn-dark`}
                                    type='button'
                                    onClick={() => setFilter({ ...filter, firstChar: letter })}
                                >
                                    {letter}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <ul className="filter-block style-2">
                        <li>
                            <a href="#" className="anime-btn btn-dark dropdown-toggle" id="genre" data-bs-toggle="dropdown"
                                data-bs-auto-close="outside" aria-expanded="false">
                                {t('genre')} <span><i className="fa fa-chevron-down"></i></span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="genre">
                                {contentTypes?.map((genre: any) => (
                                    <li key={genre.id}>
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id={genre.id}
                                                checked={filter.genre?.includes(genre.id)}
                                                onChange={() => handleGenreChange(genre.id)}
                                            />
                                            <label className="custom-control-label label-filter" htmlFor={genre.id}>
                                                {genre.name}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="anime-btn btn-dark dropdown-toggle" id="year" data-bs-toggle="dropdown"
                                data-bs-auto-close="outside" aria-expanded="false">
                                {t('year')} <span><i className="fa fa-chevron-down"></i></span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="year">
                                {years.map((year: any) => (
                                    <li key={year.id}>
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id={year.id}
                                                checked={filter.selectedYears?.includes(year.id)}
                                                onChange={() => handleYearChange(year.name)}
                                            />
                                            <label className="custom-control-label" htmlFor={year.id}>
                                                {year.name}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="anime-btn btn-dark dropdown-toggle" id="status" data-bs-toggle="dropdown"
                                data-bs-auto-close="outside" aria-expanded="false">
                                 {t('status')} <span><i className="fa fa-chevron-down"></i></span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="status">
                                <li>
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            id="status2"
                                            checked={filter.status === false}
                                            onChange={() => handleStatusChange(false)}
                                        />
                                        <label className="custom-control-label" htmlFor="status2">
                                            {t('releasing')}
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            id="status3"
                                            checked={filter.status === true}
                                            onChange={() => handleStatusChange(true)}
                                        />
                                        <label className="custom-control-label" htmlFor="status3">
                                            {t('completed')}
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="dropdown-menu" aria-labelledby="status">
                                <li>
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            id="status2"
                                            checked={filter.status === false}
                                            onChange={() => handleStatusChange(false)}
                                        />
                                        <label className="custom-control-label" htmlFor="status2">
                                            {t('releasing')}
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            id="status3"
                                            checked={filter.status === true}
                                            onChange={() => handleStatusChange(true)}
                                        />
                                        <label className="custom-control-label" htmlFor="status3">
                                            {t('completed')}
                                        </label>
                                    </div>
                                </li>
                            </ul>
                            <a href="#" className="anime-btn btn-dark dropdown-toggle" id="sort-by" data-bs-toggle="dropdown"
                                data-bs-auto-close="outside" aria-expanded="false">
                                {t('sort_by')} <span><i className="fa fa-chevron-down"></i></span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="sort-by">
                                <li>
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            id="updatedOnUtc"
                                            checked={pagingParams.SortColumn == 'updatedOnUtc'}
                                            onChange={handleSortChange}
                                        />
                                        <label className="custom-control-label" htmlFor="updatedOnUtc">
                                            {t('recently_updated')}
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            id="createdOnUtc"
                                            checked={pagingParams.SortColumn == 'createdOnUtc'}
                                            onChange={handleSortChange}
                                        />
                                        <label className="custom-control-label" htmlFor="createdOnUtc">
                                            {t('release_date')}
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            id="views"
                                            checked={pagingParams.SortColumn == 'views'}
                                            onChange={handleSortChange}
                                        />
                                        <label className="custom-control-label" htmlFor="views">
                                            {t('most_view')}
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="filter-block">
                        <li className="mb-0">
                            <button
                                className={`anime-btn btn-dark border-change`}
                                type='button'
                                onClick={() => handleSubmitFilter()}
                            >
                                {t('filter_now')}
                            </button>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default FilterComponent;