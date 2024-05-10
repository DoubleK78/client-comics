import React from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { DOTS, usePagination } from '@/lib/hooks/usePagination';

type PaginationType = {
    onPageChange: (pageIndex: number) => void,
    totalCounts: number,
    pageIndex: number,
    pageSize: number,
    className?: string,
    siblingCount?: number,
};

const Pagination: React.FC<PaginationType> = ({
    onPageChange,
    totalCounts,
    pageIndex,
    pageSize,
    className = '',
    siblingCount = 1,
}) => {
    const paginationRange = usePagination({
        totalCounts,
        pageIndex,
        pageSize,
        siblingCount
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (pageIndex === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(pageIndex + 1);
    };

    const onPrevious = () => {
        onPageChange(pageIndex - 1);
    };

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={classNames("pagination", { [className]: className })}>
            <li className={classNames("page-item", { disabled: pageIndex === 1 })}>
                <a className="hover page-link arrow" aria-label="Previous" onClick={onPrevious}>
                    <i className="fa fa-chevron-left"></i>
                </a>
            </li>
            {paginationRange.map(pageNumber => {
                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return (
                        <li key={uuidv4()} className="page-item">
                            <a className="hover page-link arrow">
                                &#8230;
                            </a>
                        </li>
                    );
                }

                // Render our Page Pills
                return (
                    <li key={uuidv4()} className='page-item'>
                        <a className={classNames('hover page-link', { active: pageNumber === pageIndex })} onClick={() => onPageChange(Number(pageNumber))}>
                            {pageNumber}
                        </a>
                    </li>
                );
            })}
            <li key={uuidv4()} className={classNames("page-item", { disabled: pageIndex === lastPage })}>
                <a className="hover page-link arrow" aria-label="Next" onClick={onNext}>
                    <i className="fa fa-chevron-right"></i>
                </a>
            </li>
        </ul>
    );
}

export default Pagination;