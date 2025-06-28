import { useState, useCallback } from 'react';

interface FilterParams {
    parentId: number;
    q: string;
}

export function useCategoryFilterState() {
    const [filterParams, setFilterParams] = useState<FilterParams>({ parentId: 0, q: '' });

    const handleTextChange = useCallback((value: string) => {
        setFilterParams((prev) => ({ ...prev, q: value }));
    }, []);

    const handleCategoryChange = useCallback((parentId: number) => {
        setFilterParams((prev) => ({ ...prev, parentId }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilterParams({ parentId: 0, q: '' });
    }, []);

    return {
        filterParams,
        handleTextChange,
        handleCategoryChange,
        resetFilters,
        searchedText: filterParams.q,
        selectedCategory: filterParams.parentId
    };
}
