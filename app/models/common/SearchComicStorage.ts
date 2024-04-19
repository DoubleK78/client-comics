import SearchComicFilter from "./SearchComicFilter";

export default interface SearchComicStorage {
    date: Date;
    comicsViFilters: Array<SearchComicFilter> | null;
    comicsEnFilters: Array<SearchComicFilter> | null;
}