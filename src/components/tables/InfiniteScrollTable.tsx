import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
// import CustomTableRow from './TableRow';
// import { fetchData } from '../api';
import { useInfiniteQuery } from '@tanstack/react-query';

// TODO - api로 변경.
// 더미 데이터 생성 함수
const generateDummyData = (page: number, pageSize: number) => {
  const data = [];
  for (let i = 0; i < pageSize; i++) {
    const id = page * pageSize + i + 1;
    data.push({ id, name: `Item ${id}` });
  }
  return data;
};

// 랜덤 딜레이 함수
const randomDelay = (min: number, max: number) => {
  return new Promise(resolve =>
    setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min)
  );
};

// 더미 데이터를 사용하는 fetchPage 함수
const fetchPage = async (pageParam = 1) => {
  await randomDelay(1000, 5000); // 1~5초 랜덤 딜레이
  const pageSize = 10; // 페이지당 항목 수
  const data = generateDummyData(pageParam - 1, pageSize);
  return {
    data,
    nextCursor: data.length === pageSize ? pageParam + 1 : undefined,
    prevCursor: pageParam > 1 ? pageParam - 1 : undefined,
  };
};

const InfiniteScrollTable: React.FC = () => {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
    isFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: ['tableData'],
    queryFn: ({ pageParam }) => fetchPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    getPreviousPageParam: firstPage => firstPage.prevCursor ?? undefined,
  });

  const observer = React.useRef<IntersectionObserver | null>(null);
  const lastElementRef = React.useCallback(
    (node: HTMLTableRowElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isError) return <div>Something went wrong...</div>;

  return (
    <Box position="relative">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.data.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
          <TableRow ref={lastElementRef}>
            <TableCell colSpan={2} align="center">
              {isFetchingNextPage ? <CircularProgress /> : null}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {isFetching && !isFetchingNextPage && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgba(255, 255, 255, 0.7)"
        >
          <CircularProgress />
        </Box>
      )}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          onClick={() => fetchPreviousPage()}
          disabled={!hasPreviousPage || isFetchingPreviousPage}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          Next Page
        </Button>
      </Box>
    </Box>
  );
};

export default InfiniteScrollTable;
